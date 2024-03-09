// Module code --------
import { listOfSpells, variantSpells } from "./legacy/mapping.js";
import { registerSettings } from "./settings.js";
import { fixPath } from "./utils.js";

const moduleName = "wild-magic-surge-companion-module";
let dataSource = "data";
const overrides = {};

Hooks.once("init", () => {
  // Register settings
  registerSettings(moduleName);

  // Patch methods
  libWrapper.register(
    moduleName,
    "MeasuredTemplate.prototype.draw",
    wildCardWrapper,
    "WRAPPER"
  );
  libWrapper.register(
    moduleName,
    "game.dnd5e.canvas.AbilityTemplate.fromItem",
    variantWrapper,
    "WRAPPER"
  );
});

Hooks.once("setup", async () => {
  if (
    typeof ForgeVTT !== "undefined" &&
    ForgeVTT.usingTheForge &&
    !game.settings.get(moduleName, "mode")
  )
    dataSource = "forge-bazaar";

  // For spells with selectable forms, add a select element to AbilityUseDialog
  Hooks.on(
    "renderAbilityUseDialog",
    async (abilityUseDialog, html, abilityUseDialogData) => {
      const { item } = abilityUseDialog;
      if (item.getFlag(moduleName, "selectedVariant"))
        await item.unsetFlag(moduleName, "selectedVariant");
      const spell = variantSpells.find((s) => s.spellName === item.name);
      // If spell is not found in variantSpells, return
      if (!spell) return;
      // If spell is not found in TMFX overrides, return
      if (
        !Object.values(
          game.settings.get("tokenmagic", "autoTemplateSettings").overrides
        ).find((o) => o.target === spell.spellName)
      )
        return;

      // Add select element to dialog HTML
      let options = "";
      for (const form of Object.keys(spell.forms)) {
        options += `<option value="${form}">${form}</option>`;
      }
      const snippet = `
            <div class="form-group">
                <label>Form</label>
                <div class="form-fields">
                    <select class="wms-select">
                    ${options}
                    </select>
                </div>
            </div>
        `;
      html.find(`form`).append(snippet);
      html.css("height", "auto");

      // Save random animation based on form to item flag; flag will be used in variantWrapper() to apply selected animation to template
      const startingForm = html.find(`select.wms-select`).val();
      await item.setFlag(
        moduleName,
        "selectedVariant",
        randomPathFromForm(item.name, startingForm)
      );

      html.find(`select.wms-select`).change(async (event) => {
        const selectedForm = $(event.currentTarget).val();

        await item.setFlag(
          moduleName,
          "selectedVariant",
          randomPathFromForm(item.name, selectedForm)
        );
      });
    }
  );

  // Get filepaths for all animations in asset folder; Note the following code only searches one directory deep

  const assetsDir = await FilePicker.browse(
    dataSource,
    dataSource === "forge-bazaar"
      ? "assets"
      : game.settings.get(moduleName, "assetsPath")
  );
  const assetPaths = [];
  assetPaths.push(...assetsDir.files);
  for (const dir of assetsDir.dirs) {
    const currentDir = await FilePicker.browse(dataSource, dir);
    assetPaths.push(...currentDir.files);
  }

  // For each spell in listOfSpells, use the filename regexps to find the corresponding paths
  const spells = [];
  const decodedPaths = assetPaths.map((p) => decodeURI(p));
  for (const spell of listOfSpells) {
    for (const filenameRegexp of spell.filenames) {
      const targets = decodedPaths.filter((p) => p.match(filenameRegexp));
      if (!targets.length) continue;

      if (!spells.find((s) => s.spellName === spell.spellName)) {
        spells.push({
          spellName: spell.spellName,
          paths: [...targets],
        });
      } else {
        spells
          .find((s) => s.spellName === spell.spellName)
          .paths.push(...targets);
      }
    }
  }

  // Create the TMFX overrides object
  let idx = 0;
  for (const spell of spells) {
    overrides[idx] = {
      target: spell.spellName,
      texture: spell.paths,
      opacity: game.settings.get(moduleName, "animationOpacity"),
      tint: "",
      preset: "NOFX",
    };

    idx++;
  }
});

Hooks.once("ready", async () => {
  // Register the newly created overrides object in TMFX settings
  const currentTMFXSettings = game.settings.get(
    "tokenmagic",
    "autoTemplateSettings"
  );
  const newSettings = {
    categories: currentTMFXSettings.categories,
    overrides,
  };
  await game.settings.set("tokenmagic", "autoTemplateSettings", newSettings);
  console.log(`${moduleName} | Token Magic FX overrides set`);
});

// When drawing a measuredTemplate, "randomly" select an animation from WMS to use and save a flag with that animation filepath
// If the flag is already present, just use that filepath (for maintaining consistency after reload and for variantSpells)
function wildCardWrapper(wrapped, ...args) {
  const savedWildCard = this.document.getFlag(moduleName, "wildCardTexture");
  if (savedWildCard) this.data.texture = savedWildCard;
  else if (this.data.texture?.includes(",")) {
    const alts = this.data.texture.split(",");
    let currentWildCardIdx = game.settings.get(moduleName, "wildCardIdx");

    if (currentWildCardIdx > alts.length - 1) currentWildCardIdx = 0;
    this.data.texture = fixPath(alts[currentWildCardIdx]);

    if (game.users.find((u) => u.isGM && u.active).id === game.user.id) {
      this.document.setFlag(moduleName, "wildCardTexture", this.data.texture);
      game.settings.set(moduleName, "wildCardIdx", currentWildCardIdx + 1);
    }
  }

  return wrapped(...args);
}

// When creating a template from an item, if the item has a "selectedVariant" flag saved (from the AbilityUseDialog),
// save the filepath as a flag on the template to be handled by the above method
function variantWrapper(wrapped, ...args) {
  const template = wrapped(...args);
  const [item] = args;
  const selectedVariant = item.getFlag(moduleName, "selectedVariant");
  if (selectedVariant)
    template.data.update({
      [`flags.${moduleName}`]: { wildCardTexture: selectedVariant },
    });

  return template;
}

// Helper function to get a random filepath based on a selected form
function randomPathFromForm(spellName, form) {
  const formRegexps = variantSpells.find((s) => s.spellName === spellName)
    .forms[form];
  const randomRegexp =
    formRegexps[Math.floor(Math.random() * formRegexps.length)];

  const paths = Object.values(
    game.settings.get("tokenmagic", "autoTemplateSettings").overrides
  ).find((o) => o.target === spellName)?.texture;
  const matchingPaths = paths.filter((p) => p.match(randomRegexp));
  if (!matchingPaths.length) return null;

  const randomPath =
    matchingPaths[Math.floor(Math.random() * matchingPaths.length)];
  return randomPath;
}

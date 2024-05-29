// Module code --------
import { loadModuleAssets } from "../free-assets/asset-loader.js";
import { listOfSpells, variantSpells } from "./legacy/mapping.js";
import { registerSettings } from "./settings.js";
import { fixPath } from "./utils.js";

const moduleName = "wild-magic-surge-companion-module";
let dataSource = "data";
console.log(`${moduleName} | Hello...`);
Hooks.once("init", () => {
  // Register settings
  console.log(`${moduleName} | Registering Settings...`);
  registerSettings(moduleName);

  // Patch methods
  console.log(`${moduleName} | Patching Methods...`);
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
  console.log(`${moduleName} | Initializing...`);
  // setup storage for spell overrides
  if (!CONFIG.WildMagicSurge) CONFIG.WildMagicSurge = { overrides: {} };

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
      // We treat all spells as if they have variants, unless they have only one image
      console.log(`${moduleName} | Spell: ${item.name}`);
      if (
        Object.values(
          game.settings.get("tokenmagic", "autoTemplateSettings").overrides
        ).filter((o) => o.target === item.name).length <= 1
      )
        return;

      const spellAutoTemplates = Object.values(
        game.settings.get("tokenmagic", "autoTemplateSettings").overrides
      ).filter((o) => o.target === item.name);

      let spellFormsGroups = {};
      // We nee to group the forms by spell variant or a "no form" group
      // Form is stored in the template.form field
      for (const spell of spellAutoTemplates) {
        const form = spell.form || "No Form";
        if (!spellFormsGroups[form]) spellFormsGroups[form] = [];
        spellFormsGroups[form].push(spell.texture);
      }

      // Add select element to dialog HTML, with optgroup for each form
      let options = "";
      // add "Random" option
      options += `<option value="">Random</option>`;
      for (const [form, textures] of Object.entries(spellFormsGroups)) {
        options += `<optgroup label="${form}">`;
        for (const texture of textures) {
          let textureName = texture.split("/").pop().split(".")[0];
          textureName = textureName
            .replace(/_/g, " ")
            .split(" ")
            .map((w) => {
              return w[0].toUpperCase() + w.slice(1);
            })
            .join(" ");
          options += `<option value="${texture}">${textureName}</option>`;
        }
        options += `</optgroup>`;
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

      html.find(`select.wms-select`).change(async (event) => {
        const selectedForm = $(event.currentTarget).val();
        if (!selectedForm) {
          await item.unsetFlag(moduleName, "selectedVariant");
          return;
        }
        await item.setFlag(moduleName, "selectedVariant", selectedForm);
      });
    }
  );

  // Get filepaths for all animations in asset folder; Note the following code only searches one directory deep

  const searchDirectory =
    dataSource === "forge-bazaar"
      ? "assets"
      : game.settings.get(moduleName, "assetsPath");
  console.log(
    `${moduleName} | Searching for assets in "${dataSource}/${searchDirectory}"...`
  );
  const assetsDir = await FilePicker.browse(dataSource, searchDirectory);
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
      for (const target of targets) {
        let idx = Object.keys(CONFIG.WildMagicSurge.overrides).length;
        CONFIG.WildMagicSurge.overrides[idx] = {
          target: spell.spellName,
          texture: target,
          opacity: game.settings.get(moduleName, "animationOpacity"),
          tint: "",
          preset: "NOFX",
          tag: "wild-magic-surge",
        };
        spells.push({ spellName: spell.spellName, filenames: [target] });
      }
    }
  }
  // add variantSpells to CONFIG.WildMagicSurge.overrides
  for (const spell of variantSpells) {
    let spellName = spell.spellName;
    for (const form in spell.forms) {
      for (const regexp of spell.forms[form]) {
        const targets = decodedPaths.filter((p) => p.match(regexp));
        for (const target of targets) {
          let idx = Object.keys(CONFIG.WildMagicSurge.overrides).length;
          CONFIG.WildMagicSurge.overrides[idx] = {
            target: spellName,
            texture: target,
            opacity: game.settings.get(moduleName, "animationOpacity"),
            tint: "",
            preset: "NOFX",
            tag: "wild-magic-surge",
            form: form,
          };
          spells.push({ spellName: spellName, filenames: [target] });
        }
      }
    }
  }

  console.log(`${moduleName} | Loaded ${spells.length} from assets`);

  loadModuleAssets();
});

Hooks.once("ready", async () => {
  // Register the newly created overrides object in TMFX settings
  const currentTMFXSettings = game.settings.get(
    "tokenmagic",
    "autoTemplateSettings"
  );
  const newSettings = {
    categories: currentTMFXSettings.categories,
    overrides: recaltulateOverrides(
      currentTMFXSettings.overrides,
      CONFIG.WildMagicSurge.overrides
    ),
  };
  await game.settings.set("tokenmagic", "autoTemplateSettings", newSettings);
  const spellCount = Object.keys(CONFIG.WildMagicSurge.overrides).length;
  console.log(
    `${moduleName} | Token Magic FX overrides set for ${spellCount} spells`
  );
});

// Helper function to recalculate the overrides object
function recaltulateOverrides(currentOverrides, newOverrides) {
  const overrides = { ...currentOverrides };
  // clean old overrides from WMS from TMFX settings
  for (const [key, value] of Object.entries(overrides)) {
    if (value.tag === "wild-magic-surge") delete overrides[key];
    else if (value.texture.includes("wild-magic-surge")) delete overrides[key];
    // if value texture is array, check if any of the values include "wild-magic-surge"
    else if (Array.isArray(value.texture)) {
      const hasWMS = value.texture.some((t) => t.includes("wild-magic-surge"));
      if (hasWMS) delete overrides[key];
    }
  }
  for (const [key, value] of Object.entries(newOverrides)) {
    // recalculating the key based of the number of current overrides
    const newKey = Object.keys(overrides).length;
    overrides[newKey] = value;
  }
  return overrides;
}

// When drawing a measuredTemplate, "randomly" select an animation from WMS to use and save a flag with that animation filepath
// If the flag is already present, just use that filepath (for maintaining consistency after reload and for variantSpells)
function wildCardWrapper(wrapped, ...args) {
  const savedWildCard = this.document.getFlag(moduleName, "wildCardTexture");
  console.log(`${moduleName} | Saved wildCard: ${savedWildCard}`);
  if (!!savedWildCard) this.document.texture = savedWildCard;
  else if (this.document.texture?.includes(",")) {
    console.log(`${moduleName} | Randomizing texture...`);
    const alts = this.document.texture.split(",");
    let currentWildCardIdx = game.settings.get(moduleName, "wildCardIdx");

    if (currentWildCardIdx > alts.length - 1) currentWildCardIdx = 0;
    this.document.texture = fixPath(alts[currentWildCardIdx]);
    console.log(`${moduleName} | New texture: ${this.document.texture}`);

    if (game.users.find((u) => u.isGM && u.active).id === game.user.id) {
      this.document.setFlag(
        moduleName,
        "wildCardTexture",
        this.document.texture
      );
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
  if (selectedVariant) console.log(template);
  template.document.update({
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

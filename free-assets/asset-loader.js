import { assets } from "./asset-mapping.js";
import { CONFIGURATION } from "./config.js";

function fixFilename(filename) {
  let fixedFilename = `modules/${CONFIGURATION.moduleName}/${
    CONFIGURATION.assetPath || ""
  }/${filename}`;
  // Replace all instances of double slashes with single slashes
  return fixedFilename.replace(/\/\//g, "/");
}

export function loadModuleAssets() {
  console.log(`${CONFIGURATION.moduleName} | Loading module assets...`);
  if (!CONFIG.WildMagicSurge) CONFIG.WildMagicSurge = { overrides: {} };

  for (const spell of assets) {
    // fix spell filenames by adding CONFIGURATION.assetPath to each filename
    console.log(spell.filenames);
    spell.filenames = spell.filenames.map((filename) => fixFilename(filename));
    let existing = Object.values(CONFIG.WildMagicSurge.overrides).find(
      (o) => o.target === spell.spellName
    );
    if (existing) {
      existing.texture = [...existing.texture, ...spell.filenames];
    } else {
      let idx = Object.keys(CONFIG.WildMagicSurge.overrides).length;
      CONFIG.WildMagicSurge.overrides[idx] = {
        target: spell.spellName,
        texture: spell.filenames,
        opacity: game.settings.get(
          CONFIGURATION.moduleName,
          "animationOpacity"
        ),
        tint: "",
        preset: "NOFX",
      };
    }
  }
  console.log(`${CONFIGURATION.moduleName} | Loaded ${assets.length} assets`);
}

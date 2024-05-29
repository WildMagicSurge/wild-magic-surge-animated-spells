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
    for (const filename of spell.filenames) {
      let idx = Object.keys(CONFIG.WildMagicSurge.overrides).length;
      CONFIG.WildMagicSurge.overrides[idx] = {
        target: spell.spellName,
        texture: filename,
        opacity: game.settings.get(
          CONFIGURATION.moduleName,
          "animationOpacity"
        ),
        tint: "",
        preset: "NOFX",
        tag: "wild-magic-surge",
      };
    }
  }
  console.log(`${CONFIGURATION.moduleName} | Loaded ${assets.length} assets`);
}

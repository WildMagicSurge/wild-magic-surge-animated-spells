export const registerSettings = function () {
  game.settings.register(moduleName, "mode", {
    name: "Self-Hosting (Legacy Assets)",
    hint: "If enabled, assets will be loaded from folder selected below.",
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    onChange: () => window.location.reload(),
  });
  game.settings.register(moduleName, "assetsPath", {
    name: "Asset Folder (Legacy Assets)",
    hint: "Ensure the path directs to a folder, not a file. The folder should contain asset pack folders.",
    scope: "world",
    config: true,
    type: String,
    default: "",
    filePicker: true,
    onChange: () => window.location.reload(),
  });
  game.settings.register(moduleName, "animationOpacity", {
    name: "Animation Opacity",
    hint: "Will not affect previously created templates.",
    scope: "world",
    config: true,
    type: Number,
    default: 0.5,
    range: {
      min: 0.1,
      max: 1,
      step: 0.1,
    },
    onChange: () => window.location.reload(),
  });
  game.settings.register(moduleName, "wildCardIdx", {
    name: "",
    scope: "world",
    config: false,
    type: Number,
    default: 0,
  });
};

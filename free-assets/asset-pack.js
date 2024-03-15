import { loadModuleAssets } from "./asset-loader.js";

Hooks.once("setup", async () => {
  loadModuleAssets();
});

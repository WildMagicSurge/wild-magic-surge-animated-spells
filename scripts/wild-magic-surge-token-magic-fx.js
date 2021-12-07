// Enter spell/animation details here ---------
const listOfSpells = [
    {
        "spellName": "Fireball",
        "filenames": [
            /\/Fireball.*\.webm/,
            /\/Pink.*\.webm/
        ]
    },
    {
        "spellName": "Flaming Sphere",
        "filenames": [
            /\/FireSphere.*\.webm/
        ]
    },
    {
        "spellName": "Wall of Fire",
        "filenames": [
            /\/FireWall-Line.*\.webm/
        ]
    },
    {
        "spellName": "Wall of Fire - Circle",
        "filenames": [
            /\/FireWall-Circle.*\.webm/,
            /\/FireWall-Ring.*\.webm/
        ]
    },
    {
        "spellName": "Flame Strike",
        "filenames": [
            /\/Fire Strike.*\.webm/
        ]
    },
    {
        "spellName": "Meteor Swarm",
        "filenames": [
            /\/MeteorV2.*\.webm/,
            /\/MeteorV1.*\.webm/,
            /\/Meteorv1.*\.webm/
        ]
    },
    {
        "spellName": "Aganazzar's Scorcher",
        "filenames": [
            /\/Scorcher.*\.webm/
        ]
    },
    {
        "spellName": "Burning Hands",
        "filenames": [
            /\/Flaming Hands.*\.webm/
        ]
    },
    {
        "spellName": "Melf's Minute Meteors",
        "filenames": [
            /.*Spinning Meteors.*\.webm/
        ]
    },
    {
        "spellName": "Chromatic Orb - Lightning",
        "filenames": [
            /\/Chromatic_Orb.*\.webm/
        ]
    },
    {
        "spellName": "Faerie Fire",
        "filenames": [
            /\/Faerie_Fire.*\.webm/,
            /\/Faerie Fire.*\.webm/
        ]
    },
    {
        "spellName": "Hypnotic Pattern",
        "filenames": [
            /\/hypnotic_pattern.*\.webm/,
            /\/Hypnotic_Pattern.*\.webm/
        ]
    },
    {
        "spellName": "Shatter",
        "filenames": [
            /\/Shatter.*\.webm/,
            /\/Shards.*\.webm/
        ]
    },
    {
        "spellName": "Synaptic Static",
        "filenames": [
            /\/Static_Synapses.*\.webm/
        ]
    },
    {
        "spellName": "Darkness",
        "filenames": [
            /\/Darkness.webm/,
            /\/DarknessTransparent.webm/,
            /\/Darkness Stars 2.webm/,
        ]
    },
    {
        "spellName": "Stinking Cloud",
        "filenames": [
            /\/StinkingCloud.*\.webm/,
            /\/Stinking Cloud.*\.webm/
        ]
    },
    {
        "spellName": `Evard's Black Tentacles`,
        "filenames": [
            /\/Wild's.*\.webm/,
            /\/Wilds.*\.webm/,
        ]
    },
    {
        "spellName": "Cloudkill",
        "filenames": [
            /\/Cloudkill.*\.webm/
        ]
    },
    {
        "spellName": "Call Lightning",
        "filenames": [
            /\/Call Lightning.*\.webm/
        ]
    },
    {
        "spellName": "Chain Lightning",
        "filenames": [
            /\/ChainLightning.*\.webm/
        ]
    },
    {
        "spellName": "Lightning Bolt",
        "filenames": [
            /\/LightningBolt.*\.webm/
        ]
    },
    {
        "spellName": "Storm Sphere",
        "filenames": [
            /\/StormSphere eb.*\.webm/,
            /\/StormSphere pink.*\.webm/,
            /\/StormSphere.webm/
        ]
    },
    {
        "spellName": "Bigby's Hand",
        "filenames": [
            /\/Arcane Hand.*\.webm/
        ]
    }
];

// Enter spells that have different animation forms --------
const variantSpells = [
    {
        "spellName": "Bigby's Hand",
        "forms": {
            "Fist": [
                /\/Arcane Hand-Fist.*\.webm/,
                /\/Arcane Hand-fist.*\.webm/
            ],
            "Forceful Hand": [
                /\/Arcane Hand-Forceful.*\.webm/
            ],
            "Grasping Hand": [
                /\/Arcane Hand-Grasping.*\.webm/,
                /\/Arcane Hand-grasping.*\.webm/
            ],
            "Interposing Hand": [
                /\/Arcane Hand-Interposing.*\.webm/
            ]
        }
    },
];


// Module code --------

import { fixPath } from '/modules/tokenmagic/module/tokenmagic.js';


const moduleName = "wild-magic-surge-token-magic-fx";
let dataSource = "data";


Hooks.once("init", () => {
    // Register module settings
    game.settings.register(moduleName, "mode", {
        name: "Self-Hosting",
        hint: "If enabled, assets will be loaded from folder selected below.",
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
        onChange: () => window.location.reload()
    });
    game.settings.register(moduleName, "assetsPath", {
        name: "Asset Folder",
        hint: "Ensure the path directs to a folder, not a file. The folder should contain asset pack folders.",
        scope: "world",
        config: true,
        type: String,
        filePicker: true,
        onChange: () => window.location.reload()
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
            step: 0.1
        },
        onChange: () => window.location.reload()
    });
    game.settings.register(moduleName, "wildCardIdx", {
        name: "",
        scope: "world",
        config: false,
        type: Number,
        default: 0
    });

    // Patch methods
    libWrapper.register(moduleName, "MeasuredTemplate.prototype.draw", wildCardWrapper, "WRAPPER");
    libWrapper.register(moduleName, "game.dnd5e.canvas.AbilityTemplate.fromItem", variantWrapper, "WRAPPER");
});

Hooks.once("setup", async () => {
    // Determine Forge status
    if (typeof (ForgeVTT) !== "undefined" && ForgeVTT.usingTheForge && !game.settings.get(moduleName, "mode")) dataSource = "forge-bazaar";

    // For spells with selectable forms, add a select element to AbilityUseDialog
    Hooks.on("renderAbilityUseDialog", async (abilityUseDialog, html, abilityUseDialogData) => {
        const { item } = abilityUseDialog;
        if (item.getFlag(moduleName, "selectedVariant")) await item.unsetFlag(moduleName, "selectedVariant");
        const spell = variantSpells.find(s => s.spellName === item.name);
        // If spell is not found in variantSpells, return
        if (!spell) return;
        // If spell is not found in TMFX overrides, return
        if (!Object.values(game.settings.get("tokenmagic", "autoTemplateSettings").overrides).find(o => o.target === spell.spellName)) return;

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
        await item.setFlag(moduleName, "selectedVariant", randomPathFromForm(item.name, startingForm));

        html.find(`select.wms-select`).change(async event => {
            const selectedForm = $(event.currentTarget).val();

            await item.setFlag(moduleName, "selectedVariant", randomPathFromForm(item.name, selectedForm));
        });
    });

    // Get filepaths for all animations in asset folder; Note the following code only goes one directory deep
    const assetsDir = await FilePicker.browse(dataSource, dataSource === "forge-bazaar" ? "assets" : game.settings.get(moduleName, "assetsPath"));
    const assetPaths = []
    assetPaths.push(...assetsDir.files);
    for (const dir of assetsDir.dirs) {
        const currentDir = await FilePicker.browse(dataSource, dir);
        assetPaths.push(...currentDir.files);
    }

    // For each spell in listOfSpells, use the filename regexps to find the corresponding paths
    const spells = [];
    const decodedPaths = assetPaths.map(p => decodeURI(p));
    for (const spell of listOfSpells) {
        for (const filenameRegexp of spell.filenames) {
            const targets = decodedPaths.filter(p => p.match(filenameRegexp));
            if (!spells.find(s => s.spellName === spell.spellName)) {
                spells.push({
                    spellName: spell.spellName,
                    paths: [...targets]
                });
            } else {
                spells.find(s => s.spellName === spell.spellName).paths.push(...targets);
            }
        }
    }

    // Create the TMFX overrides object 
    const overrides = {};
    let idx = 0;
    for (const spell of spells) {
        overrides[idx] = {
            target: spell.spellName,
            texture: spell.paths,
            opacity: game.settings.get(moduleName, "animationOpacity"),
            tint: "",
            preset: "NOFX"
        }

        idx++;
    }

    // Register the newly created overrides object in TMFX settings
    const currentTMFXSettings = game.settings.get("tokenmagic", "autoTemplateSettings");
    const newSettings = {
        categories: currentTMFXSettings.categories,
        overrides
    };
    await game.settings.set("tokenmagic", "autoTemplateSettings", newSettings);


});

// Register WMS animations into TMFX overrides


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

        if (game.users.find(u => u.isGM && u.active).id === game.user.id) {
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
    if (selectedVariant) template.data.update({ [`flags.${moduleName}`]: { wildCardTexture: selectedVariant } });

    return template;
}


// Helper function to get a random filepath based on a selected form 
function randomPathFromForm(spellName, form) {
    const formRegexps = variantSpells.find(s => s.spellName === spellName).forms[form];
    const randomRegexp = formRegexps[Math.floor(Math.random() * formRegexps.length)];

    const paths = Object.values(game.settings.get("tokenmagic", "autoTemplateSettings").overrides).find(o => o.target === spellName)?.texture;
    const matchingPaths = paths.filter(p => p.match(randomRegexp));
    if (!matchingPaths.length) return null;

    const randomPath = matchingPaths[Math.floor(Math.random() * matchingPaths.length)];
    return randomPath;
}

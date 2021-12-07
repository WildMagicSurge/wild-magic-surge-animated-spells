// Enter spell/animation details here ---------
const listOfSpells = [
    {
        "spellName": "Fireball",
        "filenames": [
            "Fireball.webm",
            "Fireball 3.webm",
            "Fireball 2.webm",
            "FireballHeavySmoke.webm",
            "Fireball Green.webm",
            "FireballGreen 2.webm",
            "Pink_Fireball.webm"
        ]
    },
    {
        "spellName": "Flaming Sphere",
        "filenames": [
            "FireSphere.webm",
            "FireSphere -Green.webm"
        ]
    },
    {
        "spellName": "Wall of Fire",
        "filenames": [
            "FireWall-Line.webm",
            "FireWall-Line - Green2.webm"
        ]
    },
    {
        "spellName": "Wall of Fire - Circle",
        "filenames": [
            "FireWall - Circle2.webm",
            "FireWall - Ring - Green.webm"
        ]
    },
    {
        "spellName": "Flame Strike",
        "filenames": [
            "Fire Strike.webm",
            "Fire Strike - Holy.webm",
            "Fire Strike - Green.webm"
        ]
    },
    {
        "spellName": "Meteor Swarm",
        "filenames": [
            "MeteorV1.webm",
            "MeteorV2.webm",
            "MeteorV2 - Green.webm",
            "MeteorV2 - Blue.webm",
            "Meteorv1 - Blue.webm",
            "Meteorv1 - Green.webm"
        ]
    },
    {
        "spellName": "Aganazzar's Scorcher",
        "filenames": [
            "Scorcher.webm",
            "Scorcher - Green.webm",
            "Scorcher - Blue.webm"
        ]
    },
    {
        "spellName": "Burning Hands",
        "filenames": [
            "Flaming Hands with template.webm",
            "Flaming Hands with template - Green.webm",
            "Flaming Hands with flaming border.webm",
            "Flaming Hands with flaming border - Blue.webm",
            "Flaming Hands - Simple Border Small.webm",
            "Flaming Hands - Simple Border Small - Green.webm",
            "Flaming Hands - Fire Border Small.webm",
            "Flaming Hands - Fire Border Small - Green.webm"
        ]
    },
    {
        "spellName": "Melf's Minute Meteors",
        "filenames": [
            "3 Spinning Meteors.webm",
            "3 Spinning Meteors - Green.webm",
            "2 Spinning Meteors.webm",
            "2 Spinning Meteors - Green.webm"
        ]
    },
    {
        "spellName": "Chromatic Orb - Lightning",
        "filenames": [
            "Chromatic_Orb(Lightning).webm", "Chromatic_Orb-Red(Lightning).webm",
            "Chromatic_Orb_Yellow(Lightning).webm"
        ]
    },
    {
        "spellName": "Faerie Fire",
        "filenames": [
            "Faerie_Fire.webm",
            "Faerie_Fire 3.webm",
            "Faerie_Fire 2.webm"
        ]
    },
    {
        "spellName": "Hypnotic Pattern",
        "filenames": [
            "hypnotic_pattern.webm",
            "Hypnotic_Pattern 3.webm",
            "Hypnotic_Pattern 2.webm"
        ]
    },
    {
        "spellName": "Shatter",
        "filenames": [
            "Shatter3.webm",
            "Shatter2.webm",
            "Shatter1.webm",
            "Shatter_Red.webm",
            "Shards_Shatter Yellow.webm",
            "Shatter_Blue.webm"
        ]
    },
    {
        "spellName": "Synaptic Static",
        "filenames": [
            "Static_Synapses3.webm",
            "Static_Synapses2.webm",
            "Static_Synapses.webm"
        ]
    },
    {
        "spellName": "Darkness",
        "filenames": [
            "DarknessTransparent.webm",
            "Darkness.webm",
            "Darkness Stars 2.webm"
        ]
    },
    {
        "spellName": "Stinking Cloud",
        "filenames": [
            "StinkingCloud.webm",
            "StinkingCloud_Transparent.webm",
            "StinkingCloud_Spores 2.webm",
            "StinkingCloud_Spores 1.webm",
            "Stinking Cloud Border Spores Transparent 2.webm",
            "Stinking Cloud Border Spores Transparent 1.webm"
        ]
    },
    {
        "spellName": `Evard's Black Tentacles`,
        "filenames": [
            "Wilds Black Tentacles Border.webm",
            "Wild's Teal Tentacles.webm",
            "Wild's Teal Tentacles Ink.webm",
            "Wild's Teal Tentacles Border.webm",
            "Wild's Purple Tentacles.webm",
            "Wild's Purple Tentacles Ink.webm",
            "Wild's Purple Tentacles Border.webm",
            "Wild's Black Tentacles.webm",
            "Wild's Black Tentacles Ink.webm"
        ]
    },
    {
        "spellName": "Cloudkill",
        "filenames": [
            "Cloudkill.webm",
            "Cloudkill_Spores1.webm",
            "Cloudkill Border Transparent.webm",
            "Cloudkill_Spores2.webm",
            "Cloudkill Border Spores Transparent 2.webm",
            "Cloudkill Border Spores Transparent 1.webm"
        ]
    },
    {
        "spellName": "Call Lightning",
        "filenames": [
            "Call Lightning - Electric Blue.webm",
            "Call Lightning - Pink.webm",
            "Call Lightning - Purple.webm"
        ]
    },
    {
        "spellName": "Chain Lightning",
        "filenames": [
            "ChainLightning - Pink.webm",
            "ChainLightning-Electric Blue.webm"
        ]
    },
    {
        "spellName": "Lightning Bolt",
        "filenames": [
            "LightningBoltV2 - Yellow.webm",
            "LightningBoltV2 - Pink.webm",
            "LightningBoltV2 - EB.webm",
            "LightningBoltV2 - Cyan.webm",
            "LightningBoltV1.webm",
            "LightningBolt EB.webm",
            "LightningBolt - Pink.webm",
            "LightningBolt - Cyan.webm"
        ]
    },
    {
        "spellName": "Storm Sphere",
        "filenames": [
            "StormSphere.webm",
            "StormSphere pink.webm",
            "StormSphere eb.webm"
        ]
    },
    {
        "spellName": "Bigby's Hand",
        "filenames": [
            "Arcane Hand-Fist star 2.webm",
            "Arcane Hand-Fist star 1.webm",
            "Arcane Hand-Fist Opaque 2.webm",
            "Arcane Hand-Fist Opaque 1.webm",
            "Arcane Hand-fist 2.webm",

            "Arcane Hand-Forceful Hand star 2.webm",
            "Arcane Hand-Forceful Hand star 1.webm",
            "Arcane Hand-Forceful hand Opaque 2.webm",
            "Arcane Hand-Forceful hand Opaque 1.webm",
            "Arcane Hand-Forceful hand 2.webm",
            "Arcane Hand-Forceful hand 1.webm",

            "Arcane Hand-Grasping Hand star 2.webm",
            "Arcane Hand-grasping hand Opaque 1.webm",
            "Arcane Hand-Grasping hand 1.webm",

            "Arcane Hand-Interposing Hand star2.webm",
            "Arcane Hand-Interposing Hand star 1.webm",
            "Arcane Hand-Interposing Hand Opaque 1.webm",
            "Arcane Hand-Interposing Hand 2.webm",
            "Arcane Hand-Interposing Hand Opaque 2.webm",
            "Arcane Hand-Interposing Hand 1.webm"
        ]
    }
];

// Enter spells that have different animation forms --------
const variantSpells = [
    {
        "spellName": "Meteor Swarm",
        "forms": {
            "Red": [
                "MeteorV1.webm",
                "MeteorV2.webm"
            ],
            "Green": [
                "Meteorv1 - Green.webm",
                "MeteorV2 - Green.webm"
            ],
            "Blue": [
                "Meteorv1 - Blue.webm",
                "MeteorV2 - Blue.webm"
            ]
        }
    },
    {
        "spellName": "Bigby's Hand",
        "forms": {
            "Fist": [
                "Arcane Hand-Fist star 2.webm",
                "Arcane Hand-Fist star 1.webm",
                "Arcane Hand-Fist Opaque 2.webm",
                "Arcane Hand-Fist Opaque 1.webm",
                "Arcane Hand-fist 2.webm"    
            ],
            "Forceful Hand": [
                "Arcane Hand-Forceful Hand star 2.webm",
                "Arcane Hand-Forceful Hand star 1.webm",
                "Arcane Hand-Forceful hand Opaque 2.webm",
                "Arcane Hand-Forceful hand Opaque 1.webm",
                "Arcane Hand-Forceful hand 2.webm",
                "Arcane Hand-Forceful hand 1.webm"    
            ],
            "Grasping Hand": [
                "Arcane Hand-Grasping Hand star 2.webm",
                "Arcane Hand-grasping hand Opaque 1.webm",
                "Arcane Hand-Grasping hand 1.webm"    
            ],
            "Interposing Hand": [
                "Arcane Hand-Interposing Hand star2.webm",
                "Arcane Hand-Interposing Hand star 1.webm",
                "Arcane Hand-Interposing Hand Opaque 1.webm",
                "Arcane Hand-Interposing Hand 2.webm",
                "Arcane Hand-Interposing Hand Opaque 2.webm",
                "Arcane Hand-Interposing Hand 1.webm"    
            ]
        }
    }
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

Hooks.once("setup", () => {
    // Determine Forge status
    if (typeof (ForgeVTT) !== "undefined" && ForgeVTT.usingTheForge && !game.settings.get(moduleName, "mode")) dataSource = "forge-bazaar";

    // For spells with selectable forms, add a select element to AbilityUseDialog
    Hooks.on("renderAbilityUseDialog", async (abilityUseDialog, html, abilityUseDialogData) => {
        const { item } = abilityUseDialog;
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
});

// Register WMS animations into TMFX overrides
Hooks.once("ready", async () => {
    // Get filepaths for all animations in asset folder; Note the following code only goes one directory deep
    const assetsDir = await FilePicker.browse(dataSource, dataSource === "forge-bazaar" ? "assets" : game.settings.get(moduleName, "assetsPath"));
    const assetPaths = []
    assetPaths.push(...assetsDir.files);
    for (const dir of assetsDir.dirs) {
        const currentDir = await FilePicker.browse(dataSource, dir);
        assetPaths.push(...currentDir.files);
    }

    // For each path, get the filename and find name of corresponding spell based on listOfSpells
    const spells = [];
    for (const path of assetPaths) {
        const filename = filenameFromPath(path);
        const spellName = listOfSpells.find(s => s.filenames.includes(filename))?.spellName;
        if (!spellName) continue;

        // Group together paths based on assigned spell name
        if (!spells.find(s => s.spellName === spellName)) {
            spells.push({
                spellName,
                paths: [path]
            });
        } else spells.find(s => s.spellName === spellName).paths.push(path);
    }

    // Create the TMFX overrides object 
    const overrides = {};
    let idx = 0;
    for (const spell of spells) {
        overrides[idx] = {
            target: spell.spellName,
            texture: spell.paths,
            opacity: 1,
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

// Helper function to convert filepath to filename
function filenameFromPath(path) {
    const lastSlashIndex = path.lastIndexOf("/");
    const endPath = path.slice(lastSlashIndex + 1);
    const filename = decodeURIComponent(endPath);

    return filename;
}

// Helper function to get a random filepath based on a selected form 
function randomPathFromForm(spellName, form) {
    const forms = variantSpells.find(s => s.spellName === spellName).forms[form];
    const randomFilename = forms[Math.floor(Math.random() * forms.length)];

    const paths = Object.values(game.settings.get("tokenmagic", "autoTemplateSettings").overrides).find(o => o.target === spellName)?.texture.split(",");
    for (const path of paths) {
        const filename = filenameFromPath(path);
        if (filename === randomFilename) return path;
    }

    return null;
}

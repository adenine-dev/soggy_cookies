Game.registerMod('Seed Seer', {
    init: function () {
        Game.mods['Seed Seer'].mutations = {
            "bakerWheat": [
                { chance: 0.2, parents: [{ plant: "bakerWheat", n: 2 }] },
                { chance: 0.05, parents: [{ plant: "thumbcorn", n: 2 }] }
            ],
            "thumbcorn": [
                { chance: 0.05, parents: [{ plant: "bakerWheat", n: 2 }] },
                { chance: 0.1, parents: [{ plant: "thumbcorn", n: 2 }] },
                { chance: 0.02, parents: [{ plant: "cronerice", n: 2 }] }
            ],
            "cronerice": [
                { chance: 0.01, parents: [{ plant: "bakerWheat", n: 1 }, { plant: "thumbcorn", n: 1 }] }
            ],
            "gildmillet": [
                { chance: 0.03, parents: [{ plant: "thumbcorn", n: 1 }, { plant: "cronerice", n: 1 }] }
            ],
            "clover": [
                { chance: 0.03, parents: [{ plant: "bakerWheat", n: 1 }, { plant: "gildmillet", n: 1 }] },
                {
                    chance: 0.007, parents: [{ plant: "clover", n: 2 }],
                    note: "No more than 4 Ordinary clover neighbors"
                }
            ],
            "goldenClover": [
                { chance: 0.0007, parents: [{ plant: "bakerWheat", n: 1 }, { plant: "gildmillet", n: 1 }] },
                {
                    chance: 0.0001, parents: [{ plant: "clover", n: 2 }],
                    note: "No more than 4 Ordinary clover neighbors"
                },
                { chance: 0.0007, parents: [{ plant: "clover", n: 4 }] }
            ],
            "shimmerlily": [
                { chance: 0.02, parents: [{ plant: "gildmillet", n: 1 }, { plant: "clover", n: 1 }] }
            ],
            "elderwort": [
                { chance: 0.01, parents: [{ plant: "cronerice", n: 1 }, { plant: "shimmerlily", n: 1 }] },
                { chance: 0.002, parents: [{ plant: "cronerice", n: 1 }, { plant: "wrinklegill", n: 1 }] }
            ],
            "bakeberry": [
                { chance: 0.001, parents: [{ plant: "bakerWheat", n: 2 }] }
            ],
            "chocoroot": [
                {
                    chance: 0.1, parents: [{ plant: "bakerWheat", n: 1 }, { plant: "brownMold", n: 1 }],
                    note: "The Brown mold may be immature"
                }
            ],
            "whiteChocoroot": [
                {
                    chance: 0.1, parents: [{ plant: "chocoroot", n: 1 }, { plant: "whiteMildew", n: 1 }],
                    note: "The White mildew may be immature"
                }
            ],
            "whiteMildew": [
                {
                    chance: 0.5, parents: [{ plant: "brownMold", n: 1 }],
                    note: "No more than 1 White mildew neighbor"
                }
            ],
            "brownMold": [
                {
                    chance: 0.1, parents: [{ plant: "meddleweed", n: 1 }],
                    note: "May grow when uprooting Meddleweed, chance increases with age"
                },
                {
                    chance: 0.5, parents: [{ plant: "brownMold", n: 1 }],
                    note: "No more than 1 Brown mold neighbor"
                }
            ],
            "meddleweed": [
                {
                    chance: 0.002, parents: [],
                    note: "Grows in empty tiles with no neighbors"
                },
                {
                    chance: 0.15, parents: [{ plant: "meddleweed", n: 1 }],
                    note: "No more than 3 adjacent Meddleweeds"
                }
            ],
            "whiskerbloom": [
                { chance: 0.01, parents: [{ plant: "shimmerlily", n: 1 }, { plant: "whiteChocoroot", n: 1 }] }
            ],
            "chimerose": [
                { chance: 0.05, parents: [{ plant: "shimmerlily", n: 1 }, { plant: "whiskerbloom", n: 1 }] },
                { chance: 0.005, parents: [{ plant: "chimerose", n: 2 }] }
            ],
            "nursetulip": [
                { chance: 0.05, parents: [{ plant: "whiskerbloom", n: 2 }] }
            ],
            "drowsyfern": [
                { chance: 0.005, parents: [{ plant: "chocoroot", n: 1 }, { plant: "keenmoss", n: 1 }] }
            ],
            "wardlichen": [
                { chance: 0.005, parents: [{ plant: "cronerice", n: 1 }, { plant: "keenmoss", n: 1 }] },
                { chance: 0.005, parents: [{ plant: "cronerice", n: 1 }, { plant: "whiteMildew", n: 1 }] },
                {
                    chance: 0.05, parents: [{ plant: "wardlichen", n: 1 }],
                    note: "No more than 1 Wardlichen neighbor"
                }
            ],
            "keenmoss": [
                { chance: 0.1, parents: [{ plant: "brownMold", n: 1 }, { plant: "greenRot", n: 1 }] },
                {
                    chance: 0.05, parents: [{ plant: "keenmoss", n: 1 }],
                    note: "No more than 1 Keenmoss neighbor"
                }
            ],
            "queenbeet": [
                { chance: 0.005, parents: [{ plant: "bakeberry", n: 1 }, { plant: "chocoroot", n: 1 }] }
            ],
            "queenbeetLump": [
                { chance: 0.001, parents: [{ plant: "queenbeet", n: 8 }] }
            ],
            "duketater": [
                { chance: 0.001, parents: [{ plant: "queenbeet", n: 2 }] }
            ],
            "crumbspore": [
                {
                    chance: 0.1, parents: [{ plant: "meddleweed", n: 1 }],
                    note: "May grow when uprooting Meddleweed, chance increases with age"
                },
                {
                    chance: 0.07, parents: [{ plant: "crumbspore", n: 1 }],
                    note: "No more than 1 Crumbspore neighbor"
                },
                { chance: 0.005, parents: [{ plant: "doughshroom", n: 2 }] }
            ],
            "doughshroom": [
                { chance: 0.005, parents: [{ plant: "crumbspore", n: 2 }] },
                {
                    chance: 0.07, parents: [{ plant: "doughshroom", n: 1 }],
                    note: "No more than 1 Doughshroom neighbor"
                }
            ],
            "glovemorel": [
                { chance: 0.02, parents: [{ plant: "thumbcorn", n: 1 }, { plant: "crumbspore", n: 1 }] }
            ],
            "cheapcap": [
                { chance: 0.04, parents: [{ plant: "shimmerlily", n: 1 }, { plant: "crumbspore", n: 1 }] }
            ],
            "foolBolete": [
                { chance: 0.04, parents: [{ plant: "doughshroom", n: 1 }, { plant: "greenRot", n: 1 }] }
            ],
            "wrinklegill": [
                { chance: 0.04, parents: [{ plant: "brownMold", n: 1 }, { plant: "crumbspore", n: 1 }] }
            ],
            "greenRot": [
                { chance: 0.05, parents: [{ plant: "clover", n: 1 }, { plant: "whiteMildew", n: 1 }] }
            ],
            "shriekbulb": [
                { chance: 0.001, parents: [{ plant: "elderwort", n: 1 }, { plant: "wrinklegill", n: 1 }] },
                { chance: 0.001, parents: [{ plant: "elderwort", n: 5 }] },
                {
                    chance: 0.005, parents: [{ plant: "duketater", n: 3 }],
                    note: "Duketaters may be immature"
                },
                {
                    chance: 0.002, parents: [{ plant: "doughshroom", n: 4 }],
                    note: "Doughshrooms may be immature"
                },
                { chance: 0.001, parents: [{ plant: "queenbeet", n: 5 }] },
                {
                    chance: 0.005, parents: [{ plant: "shriekbulb", n: 1 }],
                    note: "No more than 1 Shriekbulb neighbor"
                }
            ],
            "tidygrass": [
                { chance: 0.002, parents: [{ plant: "bakerWheat", n: 1 }, { plant: "whiteChocoroot", n: 1 }] }
            ],
            "everdaisy": [
                { chance: 0.002, parents: [{ plant: "elderwort", n: 3 }, { plant: "tidygrass", n: 3 }] }
            ],
            "ichorpuff": [
                { chance: 0.002, parents: [{ plant: "elderwort", n: 1 }, { plant: "crumbspore", n: 1 }] }
            ]
        }

        let loaded = false

        function load() {
            let minigame = Game.ObjectsById[2].minigame
            minigame.tools["seedSeer"] = {
                name: loc("Seed Seer"),
                icon: 2,
                descFunc: () => {
                    let info = "All mutations given the plot and available seeds:"
                    info += '<div style="padding: 0 4px;">'
                    let lockedSeeds = minigame.plantsById.filter((p, i) => !p.unlocked)
                    if (lockedSeeds.length == 0) {
                        info += "<p>You've unlocked all the seeds!</p>"
                    } else {
                        let plotPlants = minigame.plot.flat()
                            .reduce((a, c) => {
                                if (c[0] > 0) {
                                    if (!a[c[0] - 1]) {
                                        a[c[0] - 1] = { amt: 1, plant: minigame.plantsById[c[0] - 1] }
                                    } else {
                                        a[c[0] - 1].amt++
                                    }
                                }
                                return a
                            }, []).filter(p => p)
                        let unlockedSeeds = minigame.plantsById
                            .filter(p => p.unlocked)
                            .map(plant => ({ plant, amt: Infinity }))
                            .concat(plotPlants)

                        let mutablePlants = lockedSeeds.map((seed) => {
                            let mutations = Game.mods['Seed Seer'].mutations[seed.key].filter(mut =>
                                mut.parents.filter(p => !unlockedSeeds.some(us => us.plant.key == p.plant && us.amt >= p.n)).length == 0
                            )
                            if (!mutations.length) return false
                            return { seed, mutations }
                        }).filter(p => p && !plotPlants.some(pp => pp.plant.id == p.seed.id))
                        for (let i = 0; i < mutablePlants.length; i++) {
                            let plant = mutablePlants[i]
                            plant.mutations.sort((a, b) => b.chance - a.chance)
                            info += `<div style="margin: 6px 1px; font-size: 11px;">`
                            info += `<b>${plant.seed.name} </b>`
                            info += `<span class="gardenSeedTiny" style="background-position: ${(-0 * 48) + 'px ' + (-plant.seed.icon * 48)}px;"></span>`
                            info += `<br/><div style="padding-left: 16px">`
                            for (let j = 0; j < plant.mutations.length; j++) {
                                let mut = plant.mutations[j]
                                info += `${Beautify(mut.chance * 100, 2).replace(/(\.[1-9]*)(0+)/, '$1')}%`
                                info += ` ${mut.parents.map(p => `${minigame.plants[p.plant].name} ${'<span class="gardenSeedTiny" style="background-position:' + (-0 * 48) + 'px ' + (-minigame.plants[p.plant].icon * 48) + 'px; margin: -20px;"></span>'} ${p.n > 1 ? `×${p.n}` : ""}`).join(" + ")}`
                                if (mut.note) info += "<br/><span style='margin-left: 8px; font-size: 9px;'> (" + mut.note + ") </span>"
                                info += "<br/>"
                            }
                            info += "</div></div>"
                        }
                    }

                    return info
                },
                // isDisplayed: function () { return Game.HasAchiev('Seedless to nay') },
            }
            minigame.toolsById = []; var n = 0; for (var i in minigame.tools) { minigame.tools[i].id = n; minigame.tools[i].key = i; minigame.toolsById[n] = minigame.tools[i]; n++ }
            minigame.buildPanel()

            let style = document.createElement("style")
            style.innerText = `
                #gardenToolIcon-4, #tooltipGardenTool .eyecon {
                    background-position: -1296px -1248px !important;
                    background-image: url(img/icons.png) !important;
                }
            `
            document.head.appendChild(style)

            let toolTooltip = Game.Objects["Farm"].minigame.toolTooltip
            minigame.toolTooltip = (id) => () => {
                let tooltip = toolTooltip(id)()
                if (id == 4) tooltip = tooltip.replace('class="icon"', 'class="icon eyecon"')
                return tooltip
            }
            loaded = true
        }

        function loader() {
            if (!loaded && Game.ObjectsById[2].minigame && Game.ObjectsById[2].minigameLoaded /*&& Game.HasAchiev('Seedless to nay')*/) {
                load()
                Game.removeHook("logic", loader)
            }
        }
        Game.registerHook("logic", loader)
    },
})
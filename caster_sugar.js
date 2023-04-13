Game.registerMod('Caster Sugar', {
    sell: function () {
        let building = Game.ObjectsById[7]
        function magic(towers) {
            var lvl = Math.max(building.level, 1)
            return Math.floor(4 + Math.pow(towers, 0.6) + Math.log((towers + (lvl - 1) * 10) / 15 + 1) * 15)
        }
        // i'm way too tired to solve for towers and just sell that amount and wolfy isn't any help so we get this gross iterative approach i guess
        let n = (Game.ObjectsById[6].minigame && Game.ObjectsById[6].minigame.slot.includes(10)) ? 10 : 1
        while (magic(building.amount - n) >= building.minigame.magic) {
            building.sell(n)
        }
    },
    seerTooltip: function () {
        const predict_next_spells = n => {
            let minigame = Game.ObjectsById[7].minigame
            let totalSpellsCast = minigame.spellsCastTotal + n

            const getFTHOF = (extraRng, gfd) => {
                let failChance = minigame.getFailChance(minigame.spells["hand of fate"])
                if (gfd) failChance = Math.max(failChance, 0.5)
                Math.seedrandom(Game.seed + '/' + totalSpellsCast)
                let choices = []
                let success = Math.random() < 1 - failChance
                if (success) {
                    for (let i = 0; i < extraRng + 2; i++) { Math.random() }
                    choices = ['frenzy', 'multiply cookies']
                    if (!Object.keys(Game.buffs).includes("Dragonflight")) choices.push("click frenzy")
                    if (Math.random() < 0.1) choices.push('cookie storm', 'cookie storm', 'blab')
                    if (Math.random() < 0.25) choices.push('building special')
                    if (Math.random() < 0.15) choices = ['cookie storm drop']
                    if (Math.random() < 0.0001) choices.push('free sugar lump')
                } else {
                    for (let i = 0; i < extraRng + 2; i++) { Math.random() }
                    choices = ['clot', 'ruin cookies']
                    if (Math.random() < 0.1) choices.push('cursed finger', 'blood frenzy')
                    if (Math.random() < 0.003) choices.push('free sugar lump')
                    if (Math.random() < 0.1) choices = ['blab']
                }
                return { name: choose(choices), backfire: !success }
            }

            const getGFD = extraRng => {
                Math.seedrandom(Game.seed + '/' + totalSpellsCast)
                let failChance = minigame.getFailChance("gambler's fever dream")
                let spells = []
                for (var i in minigame.spells) { if (i != "gambler's fever dream") spells.push(minigame.spells[i]) }
                var spell = choose(spells)
                totalSpellsCast += 1
                let res
                if (spell.name == "Force the Hand of Fate") {
                    res = { spell, fthof: getFTHOF(extraRng, true) }
                } else {
                    res = { spell, fthof: null }
                }
                Math.seedrandom(Game.seed + '/' + totalSpellsCast)
                failChance = Math.max(0.5, minigame.getFailChance(res.spell))
                res.backfire = Math.random() > 1 - failChance

                totalSpellsCast -= 1
                return res
            }

            let forces = { fthof: [getFTHOF(0), getFTHOF(1)], gfd: [getGFD(0), getGFD(1)] }
            Math.seedrandom()

            return forces
        }

        const names = {
            "free sugar lump": "Sweet!",
            "blab": "Blab",
            "cookie storm drop": "Cookie Storm Drop",
            "multiply cookies": "Lucky!",
            "ruin cookies": "Ruin!",
            "building special": "Building Special",
        }

        let str = "<table style='min-width: 640px;' class='caster-sugar-seer-tooltip'>"
        str += '<thead><th></th><th colspan=4><span style="font-weight: bold">Spell Forecast:</span> <small>(The results of the next 15 spells)</small></th></thead>'
        str += '<thead><th colspan=5><div class="line"></div></th></thead>'
        str += "<thead><th></th><th colspan=2>Force The hand of Fate</th><th colspan=2>Gambler's Fever Dream</th></thead>"
        str += "<thead><th></th><th>Normal</th><th>Augmented</th><th>Normal</th><th>Augmented</th></thead>"

        for (let n = 0; n < 15; n++) {
            let spells = predict_next_spells(n)

            str += `<tr style="background-color:${n % 2 ? "transparent" : "#222"};"><th style="text-align: right;"><small>${n + 1}</small></th>`

            function make_icon(spell, fthof) {
                let margin = "margin: -16px -8px -16px -16px;"

                if (fthof) {
                    if (Game.buffTypesByName[spell.name]) {
                        return tinyIcon(Game.buffTypesByName[spell.name].func(0, 0, 0).icon, margin)
                    } else {
                        if (spell.name == "free sugar lump") {
                            return tinyIcon([29, 14])
                        } else {
                            return tinyIcon([0, 0], `${margin}transform:scale(0.4);background-size:cover;background-image:url('${spell.backfire ? "img/wrathCookie.png" : "img/goldCookie.png"}');`)
                        }
                    }
                } else {
                    return tinyIcon(spell.icon, margin)
                }
            }

            for (let i = 0; i < 2; i++) {
                let color = "rgba(255,255,255,0.5)"
                if (spells.fthof[i].backfire) color = "#f66"
                else if (spells.fthof[i].name == "building special") color = "#6ff"
                else if (spells.fthof[i].name == "click frenzy") color = "#f6f"
                else if (spells.fthof[i].name == "free sugar lump") color = "#fff"
                str += `<td><small style="color:${color};">`
                str += make_icon(spells.fthof[i], true)
                if (Game.buffTypesByName[spells.fthof[i].name]) {
                    str += `${Game.buffTypesByName[spells.fthof[i].name].func(0, 0, 0).name}`
                } else {
                    str += `${names[spells.fthof[i].name]}`
                }
                str += "</small></td>"
            }

            for (let i = 0; i < 2; i++) {
                let color = "rgba(255,255,255,0.5)"
                if (spells.gfd[i].spell.name == "Resurrect Abomination") color = "rgba(255,255,255,0.7)"
                if (spells.gfd[i].fthof) {
                    if (spells.gfd[i].fthof.backfire) color = "#f66"
                    else if (spells.gfd[i].fthof.name == "building special") color = "#6ff"
                    else if (spells.gfd[i].fthof.name == "click frenzy") color = "#f6f"
                    else if (spells.gfd[i].fthof.name == "free sugar lump") color = "#fff"
                }

                str += `<td ${!spells.gfd[i].fthof ? "colspan=2 style=''" : ""}><small style="color:${color};">`
                if (i != 1)
                    str += make_icon(spells.gfd[i].spell)

                if (spells.gfd[i].fthof) {
                    str += make_icon(spells.gfd[i].fthof, true)
                    str += `${Game.buffTypesByName[spells.gfd[i].fthof.name] ? Game.buffTypesByName[spells.gfd[i].fthof.name].func(0, 0, 0).name : names[spells.gfd[i].fthof.name]}`
                } else {
                    str += spells.gfd[i].spell.name
                }
                str += "</small></td>"
                if (!spells.gfd[i].fthof) break
            }

            str += "</tr>"
        }

        str += "</table>"

        return str
    },
    init: function () {
        let loaded = false


        function load() {
            let style = document.createElement("style")
            style.innerHTML = `
                .caster-sugar-seer-tooltip td {
                    padding: 2.5px 8px;
                    // text-align: center;
                }
                .caster-sugar-seer-tooltip th {
                    padding: 4px;
                    text-align: left;
                }
            `
            document.head.appendChild(style)
            let bar = document.getElementById("grimoireBar")
            bar.style.maxWidth = "calc(100% - 48px * 2)"
            function make(str) {
                let el = document.createElement("div")
                el.innerHTML = str
                el = el.children[0]
                return el
            }

            function icon_style_str(icon, extra) {
                return 'position:absolute;top:-17px;width:48px;height:48px;background-position:' + (-icon[0] * 48) + 'px ' + (-icon[1] * 48) + 'px;' + extra
            }

            var icon = [30, 20]
            bar.appendChild(make('<div '
                + Game.getDynamicTooltip('Game.mods[\'Caster Sugar\'].seerTooltip')
                + ' class="usesIcon shadowFilter" style="' + icon_style_str([30, 20], "right:-70px;transform:scale(0.5);z-index:1000;") + '"></div>'))

            icon = [22, 15]
            bar.appendChild(make('<div '
                + 'onclick="Game.mods[\'Caster Sugar\'].sell()"'
                + Game.getTooltip('<div style="padding:8px;width:300px;font-size:11px;text-align:center;">Click to sell wizard towers until your current magic is your max magic. <br /> <small>(If Rigidel is active it will be the nearest 10 rounded up)</small></div>')
                + ' class="usesIcon shadowFilter lumpRefill" style="' + icon_style_str([22, 15], "right:-40px;left:unset;") + '"></div>'))

            loaded = true
        }


        function loader() {
            if (!loaded && Game.ObjectsById[7].minigame && Game.ObjectsById[7].minigameLoaded) {
                load()
                Game.removeHook("logic", loader)
            }
        }

        Game.registerHook("logic", loader)
    },
})
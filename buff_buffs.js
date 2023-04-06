Game.registerMod('Buff Buffs', {
    init: function () {
        // Game.mods["Buff Buffs"] = {}
        Game.mods["Buff Buffs"].buffTooltip = function (name) {
            return '<div class="prompt" style="min-width:200px;text-align:center;font-size:11px;margin:8px 0px;" id="tooltipBuff"><h3>'
                + (Game.buffs[name].dname || loc(obj.name))
                + '</h3><div class="line"></div>'
                + Game.buffs[name].desc
                + '<div class="line"></div>'
                + Game.sayTime(Game.buffs[name].time, -1) + ' remaining.'
                + '</div>';
        }
        Game.mods["Buff Buffs"].lastLen = -1

        Game.registerHook('logic', function () {
            if (Object.keys(Game.buffs).length > Game.mods["Buff Buffs"].lastLen) {
                Game.buffsL.innerHTML = ""

                var buffs = Object.values(Game.buffs).sort(b => b.id)
                for (var i = 0; i < buffs.length; i++) {
                    var buff = buffs[i]

                    // TODO: maybe sort this out..?
                    // buff.desc = buff.desc ? buff.type.func(buff.maxTime / Game.fps, (buff.pow)?, buff.building).desc : ""

                    Game.buffsL.innerHTML += '<div id="buff' + buff.id + '" class="crate enabled buff" ' +
                        (buff.desc ?
                            Game.getDynamicTooltip("Game.mods['Buff Buffs'].buffTooltip.bind(this, '" + buff.name + "')", "left", true)
                            : '')
                        + ' style="opacity:1;float:none;display:block;' + writeIcon(buff.icon) + '"></div>';

                    buff.l = l('buff' + buff.id)
                }
            }
            Game.mods["Buff Buffs"].lastLen = Object.keys(Game.buffs).length
        })
    },
})

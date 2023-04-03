Game.registerMod('Lump Vaticinator', {
    init: function () {
        var base_tooltip_fn = Game.lumpTooltip
        Game.lumpTooltip = function () {
            var phase = ((Date.now() - Game.lumpT) / Game.lumpOverripeAge) * 7
            if (phase < 3) {
                var str = base_tooltip_fn().split('<div class="line"></div>')

                if (str.length == 5) {
                    var prediction = '';
                    if (Game.lumpCurrentType == 0) prediction += loc("This sugar lump will grow to be <b>normal</b>.");
                    else if (Game.lumpCurrentType == 1) prediction += loc("This sugar lump will grow to be <b>bifurcated</b>.");
                    else if (Game.lumpCurrentType == 2) prediction += loc("This sugar lump will grow to be <b>golden</b>.");
                    else if (Game.lumpCurrentType == 3) prediction += loc("This sugar lump will grow to be <b>meaty</b>.");
                    else if (Game.lumpCurrentType == 4) prediction += loc("This sugar lump will grow to be <b>caramelized</b>.");
                }

                str.splice(3, 0, prediction)

                return str.join('<div class="line"></div>')
            } else {
                return base_tooltip_fn()
            }
        }
    },
})

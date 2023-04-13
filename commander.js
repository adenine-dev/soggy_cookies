Game.registerMod('Commander', {
    init: function () {
        var platform = navigator.platform || navigator.userAgentData.platform
        console.log(platform)
        if (platform.toUpperCase().indexOf("MAC") != -1) {
            document.addEventListener("keydown", function (e) {
                if (e.key == "Meta") {
                    Game.keys[17] = 1 // replace ctrl with cmd generally.
                    if (Game.tooltip.dynamic) Game.tooltip.update() // update tooltips
                }

                // keycode is used by cookie clicker even tho its deprecated so we use it here for consistency
                if (e.metaKey && e.keyCode == 83) { Game.toSave = true; e.preventDefault(); } //cmd-s saves the game
                else if (e.metaKey && e.keyCode == 79) { Game.ImportSave(); e.preventDefault(); } //cmd-o opens the import menu
            })

            document.addEventListener("keyup", function (e) {
                if (e.key == "Meta") Game.keys[17] = 0
            })
        }
    },
})
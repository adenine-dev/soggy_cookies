Game.registerMod('Golden Hand', {
    init: function () {
        setInterval(() => {
            if (document.querySelector(".fortune"))
                document.querySelector("#commentsText1").click()
        }, 300)

        setInterval(() => {
            var shimmers = document.querySelectorAll("#shimmers > div")

            for (let i = 0; i < shimmers.length; i++)
                shimmers[i].click()

        }, 100)
    },
})
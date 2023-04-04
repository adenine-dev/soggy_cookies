Game.registerMod('stonksheet', {
    init: function () {
        const style = document.createElement("style")
        style.innerText = `
            .stonks-swap {
                position: absolute;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOBAMAAADtZjDiAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAABtQTFRFAAAA////AAAA////////////////////////xMrSFwAAAAl0Uk5TAP8zAQcSHxUCgQnRXAAAADFJREFUeJxjYIACRkEQEGAQUgIBRQYBiCiDIlhciIEJLK7AgA4I6TOC6WN2TatgYAAAKRYGpzIMrgIAAAAASUVORK5CYII=) !important; /* bars.png */
                height: 14px;
                width: 14px;
                top: 3px;
                left: 3px;
                opacity: 0.65;
            }
            .stonks-swap:hover {
                opacity: 1 !important;
            }
            .stonks-swap:active {
                opacity: 0.5 !important;
            }
            .stonksheet .stonks-swap {
                opacity: 0.8;
            }
            .stonksheet {
                width: 100%;
                display: flex;
                flex-direction: column;
            }
            .stonksheet .bankGood {
                width: auto !important;
                margin: 1px 2px;
                display: flex !important;
                justify-content: space-between;
            }
            .stonksheet .bankGood:hover {
                background-color: #333;
            }
            .stonksheet .bankSymbol {
                background-color: transparent !important;
            }
            .stonksheet .bankGood > div, 
            .stonksheet .bankGood > div > div,
            .stonksheet .bankSymbol {
                display: inline-block !important;
                flex: 1;
            }
            .stonksheet .bankSymbol {
                margin-top: 0 !important;
                margin-bottom: 0 !important;
            }
            .stonksheet .bankGood .icon {
                position: static !important;
            }
            .stonksheet .bankSimpleButton, .stonksheet .icon {
                position: static !important;
                flex: unset !important;
                order: -1;
            }
            .stonksheet .bankGood .icon {
                margin-right: -10px !important;
            }
            .stonksheet .bankButton {
                padding-top: 1px !important;
                padding-bottom: 1px !important;
            }
            .stonksheet .bankGood > div:first-child {
                width: auto !important;
                display: flex !important;
            }
            .stonksheet .bankGood:not(.sorter) > div:first-child {
                text-align: left !important;
            }
            .stonksheet .bankSymbol:nth-child(2) {
                text-align: center !important;
            }
            .stonksheet .bankGood > div:first-child > div:not(.icon, .bankSimpleButton) {
                width: auto !important;
            }
            .stonksheet .bankGood > div:last-child > br {
                display: none !important;
            }
            .sorter {
                display: none !important;
            }
            .sorter .bankSymbol::after {
                content: ""
            }
            .sorter .bankSymbol.sort-up:not(.anti-up-sort)::after {
                content: " ▲"
            }
            .sorter .bankSymbol.sort-down::after {
                content: " ▼"
            }
        `

        document.head.appendChild(style)

        let header = document.getElementById("bankHeader")
        let swap = document.createElement("a")
        swap.classList.add("stonks-swap")

        swap.addEventListener("click", () => {
            PlaySound('snd/tick.mp3');
            header.classList.toggle("stonksheet")
        })

        let sorter = document.createElement("div")
        sorter.classList.add('bankGood', "sorter")
        let headers = ["#", "", "Ticker", "Value", "Stock"]
        let subdiv1 = document.createElement("div")
        for (let i = 0; i < headers.length; i++) {
            let header = headers[i]
            let h = document.createElement("a")
            h.classList.add("bankSymbol")

            if (header == "#") {
                h.style.height = "auto"
                h.style.width = "24px"
                h.style.flex = "unset"
                h.style.whiteSpace = "nowrap"
                h.classList.add("anti-up-sort")
            }

            if (header == "") {
                h.classList.add("bankSimpleButton")
                h.style.pointerEvents = "none"
            }

            h.innerText = header
            h.addEventListener("click", () => {
                PlaySound('snd/tick.mp3')
                for (let j = 0; j < subdiv1.children.length; j++) {
                    if (i != j)
                        subdiv1.children[j].classList.remove("sort-up", "sort-down")
                }

                h.classList.toggle("sort-up", !h.classList.toggle("sort-down"))
                Game.mods["stonksheet"].sorter_el = h
                resort()
            })

            subdiv1.appendChild(h)
        }

        let subdiv2 = document.createElement("div")
        let buyselldiv = document.createElement("div")
        buyselldiv.classList.add("bankSymbol")
        buyselldiv.innerText = "Buy / Sell"
        subdiv2.appendChild(buyselldiv)

        sorter.appendChild(subdiv1)
        sorter.appendChild(subdiv2)

        header.insertBefore(sorter, document.getElementById("bankGood-0"))

        header.prepend(swap)

        function resort() {
            if (document.getElementById("bankHeader").classList.contains("stonksheet")
                && Game.mods["stonksheet"].sorter_el) {
                let bankGoods = Object.values(Game.Objects["Bank"].minigame.goods)
                let header = Game.mods["stonksheet"].sorter_el.innerText
                bankGoods.sort((a, b) =>
                    (Game.mods["stonksheet"].sorter_el.classList.contains("sort-down") ? -1 : 1) *
                    (header == "#" ? (a.id - b.id) :
                        header == "Ticker" ? (Game.Objects["Bank"].minigame.goodDelta(a.id) - Game.Objects["Bank"].minigame.goodDelta(b.id)) :
                            header == "Value" ? (a.val - b.val) :
                                header == "Stock" ? (a.stock - b.stock) : 1)
                )

                for (let i = 0; i < bankGoods.length; i++) {
                    bankGoods[i].l.style.order = i
                }
            }
        }

        Game.registerHook('logic', () => {
            if (Game.Objects["Bank"].minigame.toRedraw) {
                resort()
            }
        })
    },
})

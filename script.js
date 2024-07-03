document.addEventListener("DOMContentLoaded", function() {
    let coins = 100;
    let slots = 6;
    let miners = [];
    let minerPrice = 100;

    const coinsEl = document.getElementById("coins");
    const slotsEl = document.getElementById("slots");
    const buyMinerBtn = document.getElementById("buyMiner");
    const miningSlotsEls = document.querySelectorAll("#miners .slot");
    const nonWorkingSlotsEls = document.querySelectorAll("#non-working-miners .slot");

    function updateStats() {
        coinsEl.textContent = coins;
        slotsEl.textContent = slots;
    }

    function createMiner(level = 1) {
        const miner = document.createElement("div");
        miner.classList.add("miner");
        miner.textContent = level;
        miner.dataset.level = level;
        miner.draggable = true;
        miner.addEventListener("dragstart", onDragStart);
        return miner;
    }

    function onDragStart(event) {
        event.dataTransfer.setData("text", event.target.dataset.level);
        event.dataTransfer.setData("minerId", miners.indexOf(event.target));
    }

    function onDrop(event) {
        event.preventDefault();
        const level = parseInt(event.dataTransfer.getData("text"));
        const minerId = event.dataTransfer.getData("minerId");
        const miner = miners[minerId];

        if (this.firstChild) {
            const existingMiner = this.firstChild;
            const existingLevel = parseInt(existingMiner.dataset.level);
            if (existingLevel === level) {
                this.removeChild(existingMiner);
                const newMiner = createMiner(level + 1);
                miners.push(newMiner);
                this.appendChild(newMiner);
                coins += (level + 1) * 100;
                updateStats();
                return;
            }
        }

        miners.splice(minerId, 1);
        miners.push(miner);
        this.appendChild(miner);
    }

    function onDragOver(event) {
        event.preventDefault();
    }

    buyMinerBtn.addEventListener("click", function() {
        if (coins >= minerPrice) {
            coins -= minerPrice;
            minerPrice *= 2;
            const miner = createMiner();
            miners.push(miner);
            for (const slot of miningSlotsEls) {
                if (!slot.firstChild) {
                    slot.appendChild(miner);
                    break;
                }
            }
            updateStats();
        }
    });

    for (const slot of miningSlotsEls) {
        slot.addEventListener("dragover", onDragOver);
        slot.addEventListener("drop", onDrop);
    }

    for (const slot of nonWorkingSlotsEls) {
        slot.addEventListener("dragover", onDragOver);
        slot.addEventListener("drop", onDrop);
    }

    function mineCoins() {
        miningSlotsEls.forEach(slot => {
            if (slot.firstChild) {
                const level = parseInt(slot.firstChild.dataset.level);
                coins += level;
            }
        });
        updateStats();
    }

    setInterval(mineCoins, 1000);
    updateStats();
});

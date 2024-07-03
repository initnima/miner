document.addEventListener("DOMContentLoaded", function() {
    let coins = 100;
    let slots = 4;
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
        miner.addEventListener("touchstart", onTouchStart, { passive: true });
        return miner;
    }

    function onDragStart(event) {
        event.dataTransfer.setData("text", event.target.dataset.level);
        event.dataTransfer.setData("minerId", miners.indexOf(event.target));
    }

    function onTouchStart(event) {
        const miner = event.target;
        miner.classList.add("dragging");
        const touchMoveHandler = (moveEvent) => {
            const touch = moveEvent.touches[0];
            miner.style.position = 'absolute';
            miner.style.left = `${touch.clientX - miner.offsetWidth / 2}px`;
            miner.style.top = `${touch.clientY - miner.offsetHeight / 2}px`;
        };
        const touchEndHandler = () => {
            miner.classList.remove("dragging");
            miner.style.position = 'static';
            document.removeEventListener('touchmove', touchMoveHandler);
            document.removeEventListener('touchend', touchEndHandler);
            document.elementsFromPoint(miner.getBoundingClientRect().left, miner.getBoundingClientRect().top).forEach(el => {
                if (el.classList.contains('slot') && !el.firstChild) {
                    el.appendChild(miner);
                }
            });
        };
        document.addEventListener('touchmove', touchMoveHandler);
        document.addEventListener('touchend', touchEndHandler);
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
                miners = miners.filter(m => m !== existingMiner);
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
            for (const slot of nonWorkingSlotsEls) {
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

    // Initialize with one level 1 miner in the non-working slot
    const initialMiner = createMiner();
    miners.push(initialMiner);
    nonWorkingSlotsEls[0].appendChild(initialMiner);

    setInterval(mineCoins, 1000);
    updateStats();
});

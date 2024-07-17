document.addEventListener("DOMContentLoaded", function() {
    const username = prompt('Enter your username:');
    if (!username) {
        alert('Username is required!');
        return;
    }

    const users = loadUserData();
    const user = users.find(user => user.username === username);

    if (user) {
        initializeGame(user);
    } else {
        alert('User not found!');
    }
});

function initializeGame(currentUser) {
    let coins = currentUser.balance;
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
        buyMinerBtn.textContent = `Buy Miner (${minerPrice} Coins)`;
        updateUserCoins(currentUser.username, coins);
        document.getElementById('playerCoins').innerText = coins + ' coins';
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
        event.dataTransfer.setData("level", event.target.dataset.level);
        event.dataTransfer.setData("minerId", miners.indexOf(event.target));
    }

    function onTouchStart(event) {
        const miner = event.target;
        miner.classList.add("dragging");
        const touch = event.touches[0];
        const initialX = touch.clientX;
        const initialY = touch.clientY;
        const rect = miner.getBoundingClientRect();
        const offsetX = initialX - rect.left;
        const offsetY = initialY - rect.top;

        const touchMoveHandler = (moveEvent) => {
            const moveTouch = moveEvent.touches[0];
            miner.style.position = 'absolute';
            miner.style.left = `${moveTouch.clientX - offsetX}px`;
            miner.style.top = `${moveTouch.clientY - offsetY}px`;
        };

        const touchEndHandler = (endEvent) => {
            miner.classList.remove("dragging");
            miner.style.position = 'static';
            document.removeEventListener('touchmove', touchMoveHandler);
            document.removeEventListener('touchend', touchEndHandler);

            const dropElement = document.elementFromPoint(endEvent.changedTouches[0].clientX, endEvent.changedTouches[0].clientY);
            if (dropElement && dropElement.classList.contains('slot') && dropElement !== miner.parentElement) {
                if (!dropElement.firstChild) {
                    dropElement.appendChild(miner);
                } else if (dropElement.firstChild.dataset.level === miner.dataset.level) {
                    const existingMiner = dropElement.firstChild;
                    dropElement.removeChild(existingMiner);
                    const newLevel = parseInt(miner.dataset.level) + 1;
                    const newMiner = createMiner(newLevel);
                    dropElement.appendChild(newMiner);
                    miners = miners.filter(m => m !== existingMiner && m !== miner);
                    miners.push(newMiner);
                    miner.parentElement.removeChild(miner); // Remove the old miner from its parent
                }
            }
            updateStats();
        };

        document.addEventListener('touchmove', touchMoveHandler);
        document.addEventListener('touchend', touchEndHandler);
    }

    function onDrop(event) {
        event.preventDefault();
        const level = parseInt(event.dataTransfer.getData("level"));
        const minerId = event.dataTransfer.getData("minerId");
        const miner = miners[minerId];

        if (this.firstChild && this !== miner.parentElement) {
            const existingMiner = this.firstChild;
            const existingLevel = parseInt(existingMiner.dataset.level);
            if (existingLevel === level) {
                this.removeChild(existingMiner);
                const newLevel = level + 1;
                const newMiner = createMiner(newLevel);
                this.appendChild(newMiner);
                miners = miners.filter(m => m !== existingMiner && m !== miner);
                miners.push(newMiner);
                miner.parentElement.removeChild(miner); // Remove the old miner from its parent
            }
        } else if (!this.firstChild) {
            miners.splice(minerId, 1);
            miners.push(miner);
            this.appendChild(miner);
        }
        updateStats();
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
        } else {
            alert('Not enough coins to buy a miner!');
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
}

function loadUserData() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUserData(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function updateUserCoins(username, balance) {
    let users = loadUserData();
    users = users.map(user => {
        if (user.username === username) {
            user.balance = balance;
        }
        return user;
    });
    saveUserData(users);
}

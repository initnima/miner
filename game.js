const START_PRICE = 2000;
const UPGRADE_MULTIPLIER = 2;
const MINING_INTERVAL = 6 * 3600 * 1000; // 6 hours in milliseconds

let coins = 0;
let miners = 0;
let nextUpgradeCost = START_PRICE;
let lastMineTime = 0;
let miningInterval;

document.getElementById('mineButton').addEventListener('click', startMining);
document.getElementById('upgradeButton').addEventListener('click', upgrade);

function startMining() {
    const now = Date.now();

    if (now - lastMineTime >= MINING_INTERVAL) {
        lastMineTime = now;

        if (miningInterval) {
            clearInterval(miningInterval);
        }

        miningInterval = setInterval(() => {
            coins += miners;
            document.getElementById('coins').innerText = coins;
        }, 1000);

        alert("Mining started! You will earn coins every second.");
    } else {
        alert("You can only mine once every 6 hours.");
    }
}

function upgrade() {
    if (coins >= nextUpgradeCost) {
        coins -= nextUpgradeCost;
        miners += 1;
        nextUpgradeCost *= UPGRADE_MULTIPLIER;

        document.getElementById('coins').innerText = coins;
        document.getElementById('upgradeCost').innerText = nextUpgradeCost;
        updateMinersDisplay();

        alert(`Upgraded! You now have ${miners} miners.`);

        // Check if texture needs to change
        if (miners % 10 === 0) {
            alert("Texture upgrade! Your miners look cooler now!");
        }
    } else {
        alert("Not enough coins to upgrade.");
    }
}

function updateMinersDisplay() {
    const minersContainer = document.getElementById('miners');
    minersContainer.innerHTML = '';
    for (let i = 0; i < miners; i++) {
        const minerElement = document.createElement('div');
        minerElement.classList.add('miner');
        if (miners >= 10) {
            minerElement.classList.add('level2');
        }
        minersContainer.appendChild(minerElement);
    }
}

// Initial setup
document.getElementById('coins').innerText = coins;
document.getElementById('upgradeCost').innerText = nextUpgradeCost;
updateMinersDisplay();

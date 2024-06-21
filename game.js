document.addEventListener('DOMContentLoaded', () => {
    const player = {
        coins: parseFloat(localStorage.getItem('coins')) || 0,
        level: parseInt(localStorage.getItem('level')) || 1,
        earnRate: 0.1,
        upgradeCost: 2000,
        miners: parseInt(localStorage.getItem('miners')) || 0 // Initialize miners from localStorage
    };

    // Update UI function
    function updateUI() {
        document.getElementById('coins').textContent = player.coins.toFixed(1);
        document.getElementById('level').textContent = player.level;
        document.getElementById('earnRate').textContent = player.earnRate.toFixed(1);
        document.getElementById('upgradeCost').textContent = player.upgradeCost.toFixed(1); // Update upgrade cost display
    }

    // Handle mining
    function mine() {
        player.coins += player.miners;
        localStorage.setItem('coins', player.coins);
        updateUI();
    }

    // Handle upgrading miners
    window.upgrade = function() { // Define upgrade function in global scope
        if (player.coins >= player.upgradeCost) {
            player.miners++;
            player.coins -= player.upgradeCost;
            player.upgradeCost *= 2;
            localStorage.setItem('coins', player.coins);
            localStorage.setItem('upgradeCost', player.upgradeCost);
            localStorage.setItem('miners', player.miners);
            updateMiners();
            updateUI();
        } else {
            alert('Not enough coins to upgrade miners!');
        }
    }

    // Update miners in the DOM
    function updateMiners() {
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = ''; // Clear previous miners

        for (let i = 0; i < player.miners; i++) {
            const miner = document.createElement('div');
            miner.className = 'miner';
            miner.style.left = `${50 + i * 70}px`; // Adjust position
            gameContainer.appendChild(miner);
        }
    }

    // Initial setup
    updateUI();
    updateMiners();
});

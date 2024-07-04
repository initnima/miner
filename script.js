body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

#game {
    width: 95%;
    max-width: 500px;
    text-align: center;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

#stats {
    margin-bottom: 20px;
}

#miners, #non-working-miners {
    margin-bottom: 20px;
}

#miners h3, #non-working-miners h3 {
    margin: 10px 0;
}

#miners, #non-working-miners {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 10px;
}

.slot {
    width: 70px;
    height: 70px;
    border: 2px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
}

.slot:hover {
    background-color: #f0f0f0;
}

.miner {
    width: 60px;
    height: 60px;
    background-color: gold;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    user-select: none;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

// ====================================
// EMBERWICK - Game State
// ====================================

const gameState = {
    resources: {
        wood: 0,
        stone: 0,
        herbs: 0,
        magicDust: 10,
    },
    population: 0,
    hexes: {},
    achievements: [],
};

// ====================================
// UI UPDATER - syncs game state to screen
// ====================================

function updateUI() {
    document.getElementById('wood-count').textContent = gameState.resources.wood;
    document.getElementById('stone-count').textContent = gameState.resources.stone;
    document.getElementById('herbs-count').textContent = gameState.resources.herbs;
    document.getElementById('dust-count').textContent = gameState.resources.magicDust;
    document.getElementById('population-display').textContent
        = `Population: ${gameState.population}`;
}


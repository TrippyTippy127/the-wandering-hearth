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

// ====================================
// HEX GRID - layout and rendering
// ====================================

// Define which hex positions exist at the start
// Each hex has a "row" and "col" position
// "fog" means it's hidden until unlocked

const initialHexes = [
    { id: 'hex-0-0', row: 0, col: 0, state: 'empty' },
    { id: 'hex-0-1', row: 0, col: 1, state: 'empty' },
    { id: 'hex-0-2', row: 0, col: 2, state: 'empty' },
    { id: 'hex-1-0', row: 1, col: 0, state: 'empty' },
    { id: 'hex-1-1', row: 1, col: 1, state: 'start' },
    { id: 'hex-1-2', row: 1, col: 2, state: 'empty' },
    { id: 'hex-2-0', row: 2, col: 0, state: 'fog' },
    { id: 'hex-2-1', row: 2, col: 1, state: 'fog' },
    { id: 'hex-2-2', row: 2, col: 2, state: 'fog' },
    { id: 'hex-3-0', row: 3, col: 0, state: 'fog' },
    { id: 'hex-3-1', row: 3, col: 1, state: 'fog' },
    { id: 'hex-3-2', row: 3, col: 2, state: 'fog' },
];

function buildHexGrid() { // This function creates the hex grid based on the initialHexes array
    const map = document.getElementById('hex-map');
    map.innerHTML = ''; // Clear the placeholder text

    // Group hexes by row
    const rows = {};
    initialHexes.forEach(hex => {
        if (!rows[hex.row]) rows[hex.row] = [];
        rows[hex.row].push(hex);
    });

    // Build each row
    Objects.keys(rows).forEach(rowIndex => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('hex-row-offset');
        
        // Offset every other row for the honeycomb effect
        if (rowIndex % 2 !== 0) {
            rowDiv.classList.add('hex-row-offset');
        }

        rows[rowIndex].forEach(hexData => { 
            const hex = document.createElement('div'); 
            hex.classList.add('hex');
            hex.id = hexData.id;
            // Set the initial appearance based on the hex's state
            if (hexData.state === 'fog') { // Fogged hexes show a question mark and are styled differently
                hex.classList.add('hex-fog');
                hex.textContent = '?';
            } else if (hexData.state === 'start') { // The starting hex is highlighted and labeled
                hex.classList.add('hex-start'); 
                hex.textContent = 'Start';
            } else {
                hex.textContent = ''; // Empty hexes show no text
            }

            // The click event - this runs when you click a hex
            hex.addEventListener('click', () => handleHexClick(hexData.id, hexData.state));

            rowDiv.appendChild(hex);
        });

        map.appendChild(rowDiv);
    });
}

//=====================================
// HEX CLICK HANDLER - what happens when you click a hex
//=====================================

let selectedHexId = null; // Track which hex is currently selected

function handleHexClick(hexId, hexState) {
    if (hexState === 'fog') {
        alert("This are is shrouded in fog! Expand your town to reveal it.");
        return; // Stop here. Do nothing if it's fogged.
    }

    // Remove "selected" class from previously selected hex
    document.querySelectorAll('hex').forEach(h => h.classList.remove('hex-selected'));

    // Highlight the newly clicked hex
    document.getElementById(hexId).classList.add('hex-selected');

    // Remember which hex is selected
    selectedHexId = hexId;

    // Show the build menu
    document.getElementById('build-menu').classList.remove('hidden');
}

//=====================================
// INITIALIZATION - set up the game when the page loads
//=====================================

function init() {
    buildHexGrid(); // Create the hex grid on the page
    updateUI(); // Update the resource and population displays
    console.log("Emberwick is ready!");
}

init(); // Start the game when the page loads
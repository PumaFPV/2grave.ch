// Store the selected keycode mappings
const keyMappings = {};

// Handle key click events
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const keycode = document.getElementById('keycode-select').value;
        keyMappings[key.dataset.key] = keycode;
        key.textContent = `HID: ${keycode}`;
    });
});

// Handle JSON generation
document.getElementById('generate-btn').addEventListener('click', () => {
    const jsonConfig = JSON.stringify(keyMappings, null, 2);
    downloadJson(jsonConfig, 'keyboard-config.json');
});

// Function to download JSON
function downloadJson(json, filename) {
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

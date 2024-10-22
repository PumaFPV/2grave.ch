// Map HID codes to characters
const hidToCharMap = {
    // Letters
    "0x0004": "A",
    "0x0005": "B",
    "0x0006": "C",
    "0x0007": "D",
    "0x0008": "E",
    "0x0009": "F",
    "0x000A": "G",
    "0x000B": "H",
    "0x000C": "I",
    "0x000D": "J",
    "0x000E": "K",
    "0x000F": "L",
    "0x0010": "M",
    "0x0011": "N",
    "0x0012": "O",
    "0x0013": "P",
    "0x0014": "Q",
    "0x0015": "R",
    "0x0016": "S",
    "0x0017": "T",
    "0x0018": "U",
    "0x0019": "V",
    "0x001A": "W",
    "0x001B": "X",
    "0x001C": "Y",
    "0x001D": "Z",

    // Numbers
    "0x001E": "1",
    "0x001F": "2",
    "0x0020": "3",
    "0x0021": "4",
    "0x0022": "5",
    "0x0023": "6",
    "0x0024": "7",
    "0x0025": "8",
    "0x0026": "9",
    "0x0027": "0",

    // Symbols
    "0x0028": "Enter",
    "0x0029": "Escape",
    "0x002A": "Backspace",
    "0x002B": "Tab",
    "0x002C": "Space",
    "0x002D": "-",
    "0x002E": "=",
    "0x002F": "[",
    "0x0030": "]",
    "0x0031": "\\",
    "0x0033": ";",
    "0x0034": "'",
    "0x0035": "`",
    "0x0036": ",",
    "0x0037": ".",
    "0x0038": "/",

    // Function Keys
    "0x0039": "Caps Lock",
    "0x003A": "F1",
    "0x003B": "F2",
    "0x003C": "F3",
    "0x003D": "F4",
    "0x003E": "F5",
    "0x003F": "F6",
    "0x0040": "F7",
    "0x0041": "F8",
    "0x0042": "F9",
    "0x0043": "F10",
    "0x0044": "F11",
    "0x0045": "F12",

    // Modifiers
    "0xE0": "Left Ctrl",
    "0xE1": "Left Shift",
    "0xE2": "Left Alt",
    "0xE3": "Left GUI (Windows/Cmd)",
    "0xE4": "Right Ctrl",
    "0xE5": "Right Shift",
    "0xE6": "Right Alt",
    "0xE7": "Right GUI (Windows/Cmd)",

    // Navigation Keys
    "0x004A": "Print Screen",
    "0x0046": "Scroll Lock",
    "0x0047": "Pause",
    "0x0048": "Insert",
    "0x0049": "Home",
    "0x004A": "Page Up",
    "0x004B": "Delete",
    "0x004C": "End",
    "0x004D": "Page Down",
    "0x004E": "Right Arrow",
    "0x004F": "Left Arrow",
    "0x0050": "Down Arrow",
    "0x0051": "Up Arrow",

    // Numpad Keys
    "0x0054": "Num Lock",
    "0x0055": "Numpad /",
    "0x0056": "Numpad *",
    "0x0057": "Numpad -",
    "0x0058": "Numpad +",
    "0x0059": "Numpad Enter",
    "0x005A": "Numpad 1",
    "0x005B": "Numpad 2",
    "0x005C": "Numpad 3",
    "0x005D": "Numpad 4",
    "0x005E": "Numpad 5",
    "0x005F": "Numpad 6",
    "0x0060": "Numpad 7",
    "0x0061": "Numpad 8",
    "0x0062": "Numpad 9",
    "0x0063": "Numpad 0",
    "0x0064": "Numpad .",

    // Special Keys
    "0x0065": "Non-US \\",
    "0x0066": "Application",
    "0x0067": "Power",
    "0x0068": "Numpad =",
    "0x0069": "F13",
    "0x006A": "F14",
    "0x006B": "F15",
    "0x006C": "F16",
    "0x006D": "F17",
    "0x006E": "F18",
    "0x006F": "F19",
    "0x0070": "F20",
    "0x0071": "F21",
    "0x0072": "F22",
    "0x0073": "F23",
    "0x0074": "F24",
    "0x0075": "Execute",
    "0x0076": "Help",
    "0x0077": "Menu",
    "0x0078": "Select",
    "0x0079": "Stop",
    "0x007A": "Again",
    "0x007B": "Undo",
    "0x007C": "Cut",
    "0x007D": "Copy",
    "0x007E": "Paste",
    "0x007F": "Find",
    "0x0080": "Mute",
    "0x0081": "Volume Up",
    "0x0082": "Volume Down",

    "0x0000": "Unassigned"
};

// Store the selected HID key mappings
const keyMappings = {};

// Handle key click events
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const keycode = document.getElementById('keycode-select').value;
        keyMappings[key.dataset.key] = keycode;
        console.log('Selected HID code:', keycode);
        // Get the character associated with the HID code
        const char = hidToCharMap[keycode] || "Unassigned";
        key.textContent = char;  // Update the key text to show the character
    });
});

// Handle JSON generation
document.getElementById('generate-btn').addEventListener('click', () => {
    // Get the layer number from the input box
    const layerNumber = document.getElementById('layer-input').value || "0";  // Default to 0 if empty
    // Generate the layer array based on the selected keys
    const layerArray = [];
    const totalKeys = 32; // Assuming there are 32 keys in total

    for (let i = 0; i < totalKeys; i++) {
        if (keyMappings[i]) {
            layerArray.push(keyMappings[i]);
        } else {
            layerArray.push("0x0000"); // Placeholder for keys not yet assigned
        }
    }

    // Create the JSON structure
    const jsonConfig = {
        "Layer": layerArray
    };

    // Convert to JSON string and trigger download
    const jsonString = JSON.stringify(jsonConfig, null, 4); // Pretty-print with indentation
    const filename = `kb-l${layerNumber}.json`;
    downloadJson(jsonString, filename);
});

// Function to download the JSON file
function downloadJson(json, filename) {
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}



function resizeContainer() {
    const keyboardContainer = document.getElementById('keyboard-container');

    if (!keyboardContainer) {
        console.error('keyboard-container not found');
        return;
    }

    // Get the current viewport width
    const viewportWidth = window.innerWidth;

    // Set the container width to 90% of the viewport width, but you can adjust this value
    const containerWidth = viewportWidth * 0.9;

    // Maintain a 16:9 aspect ratio (height = width * 9 / 16)
    const containerHeight = containerWidth * 9 / 16;

    // Apply the calculated width and height to the container
    keyboardContainer.style.width = `${containerWidth}px`;
    keyboardContainer.style.height = `${containerHeight}px`;

    // console.log(`Resized container to width: ${containerWidth}px, height: ${containerHeight}px`);
    const divElement = document.getElementById('keyboard-container');  // Get the div element
    const rect = divElement.getBoundingClientRect();  // Get the dimensions and position

    const divWidth = rect.width;  // Width of the div
    const divHeight = rect.height;  // Height of the div

    // console.log('Div width:', divWidth);
    // console.log('Div height:', divHeight);

    const divElementKeyboardContainer = document.getElementById('keyboard-container');

    // Set the width dynamically (for example, 400px)
    divElementKeyboardContainer.style.width = divHeight * 12/9 + 'px';
}

// Call the function when the page loads and on window resize
window.addEventListener('load', resizeContainer);
window.addEventListener('resize', resizeContainer);


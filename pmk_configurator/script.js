// Store the selected HID key mappings
const keyMappings = {};

// Handle key click events
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const keycode = document.getElementById('keycode-select').value;
        keyMappings[key.dataset.key] = keycode;
        key.textContent = `HID: ${keycode}`;  // Update the key text to show selected HID
    });
});

// Handle JSON generation
document.getElementById('generate-btn').addEventListener('click', () => {
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
    downloadJson(jsonString, 'kb-l0.json');
});

// Function to download the JSON file
function downloadJson(json, filename) {
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Get the keyboard container element
const keyboardContainer = document.getElementById('keyboard-container');

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = 'TopViewWithCasingNoBG.png';  // Your image file

// Function to resize the keyboard container based on the image's intrinsic dimensions
backgroundImage.onload = function () {
    // Get the intrinsic dimensions of the image
    const imgWidth = backgroundImage.width;
    const imgHeight = backgroundImage.height;

    // Function to resize the container while maintaining the image's aspect ratio
    function resizeContainer() {
        const viewportWidth = window.innerWidth;  // Get the current viewport width

        // Calculate the container width, 90% of the viewport width but not larger than the image's natural width
        const containerWidth = Math.min(viewportWidth * 0.9, imgWidth);  // Limit the width to the image width

        // Calculate the height to maintain the aspect ratio
        const containerHeight = (imgHeight / imgWidth) * containerWidth;

        // Apply the dynamic width and height to the keyboard container
        keyboardContainer.style.width = `${containerWidth}px`;
        keyboardContainer.style.height = `${containerHeight}px`;
    }

    // Initial resize when the page loads
    resizeContainer();

    // Add an event listener to resize the container whenever the window is resized
    window.addEventListener('resize', resizeContainer);
};
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
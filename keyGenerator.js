// Function to generate a key based on the current date
function generateKey() {
    const date = new Date();
    // Format: KEY-YYYY-MM-DD (e.g., KEY-2025-03-07)
    const key = "KEY-" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    console.log("Generated Key: " + key); // Log the key to the console
    return key;
}

// Display the generated key on the page after it loads
window.onload = function() {
    const key = generateKey();  // Generate the key
    const keyElement = document.getElementById("key");  // Find the element by id
    if (keyElement) {
        keyElement.innerText = key;  // Set the key in the HTML element
    } else {
        console.log("Error: Element with id 'key' not found.");
    }
};

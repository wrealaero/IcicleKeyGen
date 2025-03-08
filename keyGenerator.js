// Function to generate a random string (alphanumeric characters)
function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}

// Function to generate a key based on the current date + random string
function generateKey() {
    const date = new Date();
    // Format: KEY-YYYY-MM-DD
    const datePart = "KEY-" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const randomPart = generateRandomString(8);  // 8 random alphanumeric characters
    const key = `${datePart}-${randomPart}`; // Combine date and random part for final key
    
    console.log("Generated Key: " + key); // Log the key to the console (for debugging)
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

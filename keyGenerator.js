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

// Function to get or generate the key
function getKey() {
    const storedKey = localStorage.getItem('dailyKey');
    const storedTimestamp = localStorage.getItem('keyTimestamp');
    const currentTime = new Date().getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // If a key exists and it's within the 24-hour validity period, return the stored key
    if (storedKey && currentTime - storedTimestamp < oneDayInMs) {
        return storedKey;
    } else {
        // Otherwise, generate a new key and store it with the current timestamp
        const newKey = generateKey();
        localStorage.setItem('dailyKey', newKey);
        localStorage.setItem('keyTimestamp', currentTime); // Store the current timestamp
        return newKey;
    }
}

// Display the generated key on the page after it loads
window.onload = function() {
    const key = getKey();  // Get the key (either from localStorage or generated)
    const keyElement = document.getElementById("key");  // Find the element by id
    if (keyElement) {
        keyElement.innerText = key;  // Set the key in the HTML element
    } else {
        console.log("Error: Element with id 'key' not found.");
    }
};

// Copy key function
function copyKey() {
    const keyElement = document.getElementById("key");
    if (keyElement) {
        const key = keyElement.innerText;
        navigator.clipboard.writeText(key).then(() => {
            alert("Key copied to clipboard!");
        });
    }
}

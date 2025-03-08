// Function to generate a unique key based on the current date and random elements
function generateKey() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Ensure two-digit month
    const day = ("0" + date.getDate()).slice(-2); // Ensure two-digit day

    // Generate a random alphanumeric string (16 characters)
    const randomString = Math.random().toString(36).substring(2, 18).toUpperCase();

    // Generate a random special character
    const specialChar = ['@', '#', '$', '%', '&', '*', '!'][Math.floor(Math.random() * 7)];

    // Combine everything to form a unique key
    const key = `KEY-${year}-${month}-${day}-${randomString}-${specialChar}`;
    return key;
}

// Function to store the key in localStorage and retrieve it
function getStoredKey() {
    const storedDate = localStorage.getItem('keyDate');
    const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
    
    // If the stored key date is different from the current date, generate a new key
    if (storedDate !== currentDate) {
        const newKey = generateKey();
        localStorage.setItem('key', newKey);
        localStorage.setItem('keyDate', currentDate); // Store the current date for reference
        return newKey;
    }
    
    // If the key for today is already stored, return it
    return localStorage.getItem('key');
}

// Display the generated key on the page when it loads
window.onload = function() {
    const key = getStoredKey(); // Get or generate the key for today
    const keyElement = document.getElementById("key"); // Find the element by id
    if (keyElement) {
        keyElement.innerText = key; // Set the key in the HTML element
    } else {
        console.log("Error: Element with id 'key' not found.");
    }
};

// Copy the key to the clipboard
function copyKey() {
    const keyElement = document.getElementById("key");
    if (keyElement) {
        const key = keyElement.innerText;
        navigator.clipboard.writeText(key).then(() => {
            alert("Key copied to clipboard!");
        });
    }
}

// Event listener for the "Copy" button
document.getElementById('copyButton').addEventListener('click', function() {
    copyKey();
});

// Function to generate a unique key based on the current date
function generateKey() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Ensure two-digit month
    const day = ("0" + date.getDate()).slice(-2); // Ensure two-digit day
    const key = `KEY-${year}-${month}-${day}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`; // Add a random part to make it more unique
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

// Function to check if the user came from Linkvertise
function checkReferrer() {
    const referrer = document.referrer;
    const linkvertiseUrl = "https://link-hub.net/1233399/icicle-key-generator"; // Your Linkvertise URL

    // If the referrer is not from Linkvertise, show an alert and redirect to Linkvertise
    if (!referrer.includes(linkvertiseUrl)) {
        alert("Please visit the website through Linkvertise to get your key.");
        window.location.href = linkvertiseUrl; // Redirect to Linkvertise
    }
}

// Display the generated key on the page when it loads
window.onload = function() {
    checkReferrer(); // Check if the user came from Linkvertise
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

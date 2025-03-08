// Function to generate a unique key based on the current date
function generateKey() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const key = `KEY-${year}-${month}-${day}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    return key;
}

// Function to store and retrieve the key
function getStoredKey() {
    const storedDate = localStorage.getItem('keyDate');
    const currentDate = new Date().toISOString().slice(0, 10);

    if (storedDate !== currentDate) {
        const newKey = generateKey();
        localStorage.setItem('key', newKey);
        localStorage.setItem('keyDate', currentDate);
        return newKey;
    }
    return localStorage.getItem('key');
}

// Function to check if the user came from Linkvertise
function checkAccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const verified = urlParams.get('verified');

    const storedVerification = localStorage.getItem('verifiedDate');
    const currentDate = new Date().toISOString().slice(0, 10);

    if (verified === "true") {
        localStorage.setItem('verifiedDate', currentDate); // Store today's date as verified
    }

    // If user isn't verified for today, redirect them to Linkvertise
    if (storedVerification !== currentDate) {
        alert("Please visit the website through Linkvertise to get your key.");
        window.location.href = "https://link-hub.net/1233399/icicle-key-generator"; // Redirect to Linkvertise
        return;
    }

    // Display the key
    const key = getStoredKey();
    const keyElement = document.getElementById("key");
    if (keyElement) {
        keyElement.innerText = key;
    } else {
        console.log("Error: Element with id 'key' not found.");
    }
}

// Display the generated key on the page when it loads
window.onload = function() {
    checkAccess();
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

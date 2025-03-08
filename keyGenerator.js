function generateKey() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    // Generate a more complex random string
    const randomString = Math.random().toString(36).substring(2, 12).toUpperCase(); // Longer random string
    const randomDigits = Math.floor(Math.random() * 10000); // Add random digits

    // Combine them into a more complex key
    const key = `KEY-${year}-${month}-${day}-${randomString}-${randomDigits}`;
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

// Function to generate a daily secret code
function getDailySecret() {
    const date = new Date().toISOString().slice(0, 10);
    const secret = btoa(`SECRET-${date}`);
    return secret;
}

// Function to check if the user came from Linkvertise or entered the correct password
function checkAccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const verified = urlParams.get('verified');
    const providedKey = urlParams.get('key');
    const correctKey = getDailySecret(); // Correct key for today

    const storedVerification = localStorage.getItem('verifiedDate');
    const currentDate = new Date().toISOString().slice(0, 10);

    // If user hasn't verified today, redirect to Linkvertise
    if (storedVerification !== currentDate) {
        if (!verified || providedKey !== correctKey) {
            // Redirect to Linkvertise if not verified
            window.location.href = "https://linkvertise.com/1233399/icicle-key-generator?o=sharing";
            return;
        }
    }

    // If they are verified today, store the verification date and display the key
    if (verified === "true" && providedKey === correctKey) {
        localStorage.setItem('verifiedDate', currentDate);
    }

    // Display the key if verified
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

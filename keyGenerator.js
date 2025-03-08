// Function to generate key based on the current date
function generateKey() {
    const date = new Date();
    const key = "KEY-" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(); // Format: KEY-YYYY-MM-DD
    return key;
}

// Function to validate the key entered by the user
function validateKey() {
    const userKey = document.getElementById("keyInput").value;
    const correctKey = generateKey(); // Generate today's key

    // Compare entered key with generated key
    if (userKey === correctKey) {
        document.getElementById("result").innerText = "Access Granted!";
    } else {
        document.getElementById("result").innerText = "Invalid Key. Try again!";
    }
}

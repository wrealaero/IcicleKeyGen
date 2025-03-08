// Function to generate a key based on the current date
function generateKey() {
    const date = new Date();
    // Format: KEY-YYYY-MM-DD (e.g., KEY-2025-03-07)
    const key = "KEY-" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return key;
}

// Display the generated key on the page
document.getElementById("key").innerText = generateKey();

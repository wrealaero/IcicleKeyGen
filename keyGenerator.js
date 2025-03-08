// Function to generate a key based on the current date
function generateKey() {
    const date = new Date();
    const key = "KEY-" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(); // Format: KEY-YYYY-MM-DD
    return key;
}

// Show the generated key on the page
document.getElementById("key").innerText = generateKey();

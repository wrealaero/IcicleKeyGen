// This function generates the key, based on the current date, and stores it for the day.
function generateKey() {
    const currentDate = new Date();
    const storedDate = localStorage.getItem("lastGeneratedDate");

    // Check if the key was already generated today.
    if (storedDate === currentDate.toDateString()) {
        return localStorage.getItem("key");  // Return the previously generated key.
    }

    // If it's a new day, generate a new key.
    const randomString = Math.random().toString(36).substring(2, 12).toUpperCase();
    const randomDigits = Math.floor(Math.random() * 10000);
    const newKey = `KEY-${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}-${randomString}-${randomDigits}`;

    // Store the generated key and today's date in localStorage (so it doesn't change until the next day).
    localStorage.setItem("lastGeneratedDate", currentDate.toDateString());
    localStorage.setItem("key", newKey);

    return newKey;
}

// Display the key on the website when the user enters the correct password.
function displayKey() {
    const key = generateKey();
    document.getElementById("key").innerText = key;
}

// Password check function
function checkPassword() {
    const enteredPassword = document.getElementById('password').value;
    const correctPassword = "Icicle2025"; // Set your password here

    if (enteredPassword === correctPassword) {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('key-box').style.display = 'block';
        displayKey();
    } else {
        alert("Incorrect password. Try again.");
    }
}

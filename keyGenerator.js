const correctPassword = "Icicle2025";  // The password you want to use

function checkPassword() {
    const enteredPassword = document.getElementById('password').value;
    if (enteredPassword === correctPassword) {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('key-box').style.display = 'block';
        displayKey();
    } else {
        alert("Incorrect password. Try again.");
    }
}

function generateKey() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    const randomString = Math.random().toString(36).substring(2, 12).toUpperCase();
    const randomDigits = Math.floor(Math.random() * 10000);

    return `KEY-${year}-${month}-${day}-${randomString}-${randomDigits}`;
}

function displayKey() {
    const key = generateKey();
    const keyElement = document.getElementById("key");
    if (keyElement) {
        keyElement.innerText = key;
    } else {
        console.log("Error: Element with id 'key' not found.");
    }
}

function copyKey() {
    const keyElement = document.getElementById("key");
    if (keyElement) {
        const key = keyElement.innerText;
        navigator.clipboard.writeText(key).then(() => {
            alert("Key copied to clipboard!");
        });
    }
}

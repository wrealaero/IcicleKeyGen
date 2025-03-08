<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Icicle Key Generator</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet"> <!-- Custom Font -->
    <style>
        /* Global Styles */
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(45deg, #4e54c8, #8f94fb); /* Gradient background */
            color: #fff;
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            animation: gradientBackground 10s ease infinite; /* Animated gradient background */
        }

        /* Key Box */
        .key-box {
            background-color: rgba(0, 0, 0, 0.7);
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            max-width: 500px;
            width: 100%;
        }

        /* Title Text */
        h1 {
            font-size: 2.5em;
            margin-bottom: 20px;
            letter-spacing: 2px;
            text-transform: uppercase;
            animation: textAnimation 1s ease-in-out infinite alternate;
        }

        /* Key Display */
        .key {
            font-size: 1.5em;
            font-weight: 600;
            margin-top: 20px;
            color: #00ff99;
            word-wrap: break-word;
            animation: fadeInKey 2s ease-out;
        }

        /* Button Styles */
        .button {
            margin-top: 30px;
            padding: 10px 20px;
            background-color: #00ff99;
            color: #000;
            font-weight: bold;
            text-transform: uppercase;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .button:hover {
            background-color: #00e68a;
        }

        /* Animated Background */
        @keyframes gradientBackground {
            0% { background: linear-gradient(45deg, #4e54c8, #8f94fb); }
            50% { background: linear-gradient(45deg, #a18cd1, #fbc2eb); }
            100% { background: linear-gradient(45deg, #ff8c00, #e52d27); }
        }

        /* Text Animation */
        @keyframes textAnimation {
            0% { opacity: 0.5; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
        }

        /* Key Animation */
        @keyframes fadeInKey {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>
    <div class="key-box">
        <h1>Get Your Key!</h1>
        <p>Your key for today is:</p>
        <p class="key" id="key"></p>
        <button class="button" onclick="copyKey()">Copy Key</button>
    </div>

    <script>
        // Function to generate a unique key based on the current date
        function generateKey() {
            const date = new Date();
            const year = date.getFullYear();
            const month = ("0" + (date.getMonth() + 1)).slice(-2); // Ensure two-digit month
            const day = ("0" + date.getDate()).slice(-2); // Ensure two-digit day
            const key = `KEY-${year}-${month}-${day}`; // The format KEY-YYYY-MM-DD
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
        window.onload = function() {
            const urlParams = new URLSearchParams(window.location.search);
            const referrer = urlParams.get('ref') || document.referrer;
            const linkvertiseURL = "https://linkvertise.com"; // Your Linkvertise page URL

            if (referrer !== 'linkvertise' && referrer.indexOf(linkvertiseURL) === -1) {
                // If no valid referrer, show error or redirect
                document.body.innerHTML = "<h1>You must visit through Linkvertise!</h1>";
            } else {
                // Proceed with key generation
                const key = getStoredKey();
                const keyElement = document.getElementById("key");
                if (keyElement) {
                    keyElement.innerText = key;
                }
            }
        };

        // Function to copy the key to the clipboard
        function copyKey() {
            const keyElement = document.getElementById("key");
            if (keyElement) {
                const key = keyElement.innerText;
                navigator.clipboard.writeText(key).then(() => {
                    alert("Key copied to clipboard!");
                });
            }
        }
    </script>
</body>
</html>

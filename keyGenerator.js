function generateKey() {
  const recaptchaResponse = grecaptcha.getResponse();
  if (recaptchaResponse.length == 0) {
    alert("Please complete the CAPTCHA to generate a key.");
    return;
  }

  // Check if a key has been stored in LocalStorage
  const storedKey = localStorage.getItem('key');
  const storedTimestamp = localStorage.getItem('timestamp');
  const currentTime = Date.now();

  // If the key exists and the timestamp is within 24 hours, use the stored key
  if (storedKey && storedTimestamp && currentTime - storedTimestamp < 86400000) {
    // Display the stored key
    document.getElementById('keyDisplay').innerText = `Your key: ${storedKey}`;
  } else {
    // Generate a new key if no key is stored or it's older than 24 hours
    let newKey = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
      newKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Store the new key and timestamp in LocalStorage
    localStorage.setItem('key', newKey);
    localStorage.setItem('timestamp', currentTime.toString());

    // Display the new key
    document.getElementById('keyDisplay').innerText = `Your key: ${newKey}`;
  }
}

function generateKey() {
  const recaptchaResponse = grecaptcha.getResponse();
  if (recaptchaResponse.length == 0) {
    alert("Please complete the CAPTCHA to generate a key.");
    return;
  }

  const storedKey = localStorage.getItem('key');
  const storedTimestamp = localStorage.getItem('timestamp');
  const currentTime = Date.now();

  if (storedKey && storedTimestamp && currentTime - storedTimestamp < 86400000) {
    document.getElementById('keyDisplay').innerText = `Your key: ${storedKey}`;
  } else {
    let newKey = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
      newKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    localStorage.setItem('key', newKey);
    localStorage.setItem('timestamp', currentTime.toString());
    document.getElementById('keyDisplay').innerText = `Your key: ${newKey}`;
  }
}

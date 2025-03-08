function generateKey() {
  let key = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // Display the generated key
  document.getElementById('keyDisplay').innerText = `Your key: ${key}`;
}

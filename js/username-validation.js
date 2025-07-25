// username-validation.js
// Highlights username input box red until valid, then green

document.addEventListener('DOMContentLoaded', function () {
  const usernameInput = document.getElementById('username');
  if (usernameInput) {
    usernameInput.addEventListener('input', function () {
      const value = usernameInput.value;
      const hasLetter = /[a-zA-Z]/.test(value);
      const hasDigit = /\d/.test(value);
      const hasSpecial = /[^a-zA-Z0-9]/.test(value);
      const isLongEnough = value.length >= 6;
      if (hasLetter && hasDigit && hasSpecial && isLongEnough) {
        usernameInput.classList.remove('is-invalid');
        usernameInput.classList.add('is-valid');
      } else {
        usernameInput.classList.remove('is-valid');
        usernameInput.classList.add('is-invalid');
      }
    });
    // Initial state
    usernameInput.classList.add('is-invalid');
  }
});

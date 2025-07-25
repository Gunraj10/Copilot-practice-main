// username-validation.test.js
// Unit tests for username validation logic

function isValidUsername(value) {
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasSpecial = /[^a-zA-Z0-9]/.test(value);
  const isLongEnough = value.length >= 6;
  return hasLetter && hasDigit && hasSpecial && isLongEnough;
}

// Jest unit tests
describe('isValidUsername', () => {
  it('Valid username passes', () => {
    expect(isValidUsername('abc1$2')).toBe(true);
  });

  it('Too short fails', () => {
    expect(isValidUsername('a1$')).toBe(false);
  });

  it('No letter fails', () => {
    expect(isValidUsername('123456$')).toBe(false);
  });

  it('No digit fails', () => {
    expect(isValidUsername('abcdef$')).toBe(false);
  });

  it('No special char fails', () => {
    expect(isValidUsername('abc123')).toBe(false);
  });
});

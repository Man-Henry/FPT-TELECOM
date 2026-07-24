const url = 'https://formspree.io/f/mpqvjbdw';
const encoded = Buffer.from(url).toString('base64');
const reversed = encoded.split('').reverse().join('');
console.log('Use this in _dx():', reversed);

// Verify
const decoded = Buffer.from(reversed.split('').reverse().join(''), 'base64').toString();
console.log('Decoded back:', decoded);

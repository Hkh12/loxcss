module.exports = str => str.split('').reverse().join('').split('.').splice(1, str.length).reverse().map(e => e.split('').reverse().join('')).join('.');

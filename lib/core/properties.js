const ctk = require('../utils/camel-to-kebab');

module.exports = function (obj) {
    for (let prop in obj) {
        let next = ctk(prop);
        let value = obj[prop];

        if (next.match(/right/gi)) {
            next = next.replace(/right/gi, 'left')
        } else if (next.match(/left/gi)) {
            next = next.replace(/left/gi, 'right')
        }

        if (next === 'direction') {
            if (value.toLowerCase() === 'ltr') {
                value = 'rtl'
            } else if (value.toLowerCase() === 'rtl') {
                value = 'ltr'
            }
        }

        delete obj[prop];
        obj[next] = value;
    }
    return obj;
};

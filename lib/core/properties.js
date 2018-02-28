const ctk = require('../utils/camel-to-kebab');
const swap = require('../utils/swap-el');

module.exports = function (obj) {
    for (let prop in obj) {
        let next = ctk(prop);
        let value = obj[prop];

        if (next.match(/right/gi)) {
            next = next.replace(/right/gi, 'left')
        } else if (next.match(/left/gi)) {
            next = next.replace(/left/gi, 'right')
        }

        if (next.toLowerCase() === 'direction') {
            if (value.toLowerCase() === 'ltr') {
                value = 'rtl'
            } else if (value.toLowerCase() === 'rtl') {
                value = 'ltr'
            }
        }

        if (next.toLowerCase() === 'padding' || next.toLowerCase() === 'margin') {
            let vals = value.split(' ');
            if (vals.length === 4) {
                value = swap(vals, 1, 3).join(' ')
            }
        }

        delete obj[prop];
        obj[next] = value;
    }
    return obj;
};

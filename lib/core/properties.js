const ctk = require('../utils/camel-to-kebab');
const swap = require('../utils/swap-el');

function isAIIU(e) {
    e = e.toLowerCase();
    return e === 'auto' || e === 'inherit' || e === 'initial' && e === 'unset' && e === 'none';
}

function removeLast(string, n, start = 0) {
    return string.substring(start, string.length - n);
}

module.exports = function (object) {
    for (const block in object) {
        let obj = object[block]
        for (let prop in obj) {
            let _prop = ctk(prop);
            let value = obj[prop];

            if (_prop.match(/right/gi) && _prop !== 'right') {
                _prop = _prop.replace(/right/gi, 'left')
            } else if (_prop.match(/left/gi) && _prop !== 'left') {
                _prop = _prop.replace(/left/gi, 'right')
            }

            if (_prop === 'right') {
                if (obj.left) {
                    value = obj.left;
                    obj.left = obj.right
                } else {
                    _prop = 'left';
                }
            }

            if (_prop === 'text-align') {
                if (value.toLowerCase() === 'left') {
                    value = 'right';
                } else if (value.toLowerCase() === 'right'){
                    value = 'left';
                }
            }

            if (_prop === 'direction') {
                if (value.toLowerCase() === 'ltr') {
                    value = 'rtl'
                } else if (value.toLowerCase() === 'rtl') {
                    value = 'ltr'
                }
            }

            if (_prop === 'border-radius' && value.toLowerCase().split(' ').length === 4) {
                value = swap(swap(value.split(' '), 0, 1), 2, 3).join(' ')
            }

            if (_prop === 'padding' || _prop === 'margin') {
                let vals = value.split(' ');
                if (vals.length === 4) {
                    value = swap(vals, 1, 3).join(' ')
                }
            }

            if (_prop === 'css-float') {
                if (value.toLowerCase() === 'left') {
                    value = 'right';
                } else if (value.toLowerCase() === 'right') {
                    value = 'left'
                }
            }

            if (_prop === 'transform' && !isAIIU(value)) {
                let transforms = value.match(/\w([^)]+)\)/gim);
                if (transforms.length) {
                    for (var i = 0; i < transforms.length; i++) {
                        let trans = transforms[i];
                        let func = removeLast(trans.match(/(^| )([^)]+)\(/gim)[0], 1);
                        let value = removeLast(trans.match(/\(([^)]*)/gim)[0], 0, 1);
                        if (value.match(/,/)) {
                            value = value.split(',').map(e => e.trim())
                        }
                        console.log(func + ': ' + value);
                    }
                };
                value = value;
            }

            delete obj[prop];
            obj[_prop] = value;
        }
    }
    return object;
};

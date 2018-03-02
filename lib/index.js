const core = require('./core/');

function Lox(code) {
    return core(code)
}

module.exports = Lox;

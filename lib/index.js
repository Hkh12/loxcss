const core = require('./core/');

function Lox(file) {
    return core(file)
}

module.exports = Lox;

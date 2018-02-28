const core = require('./core/');

function Lox(file, config) {
    config = config || {};
    core(file, config);
}

Lox(process.argv[2])

module.exports = Lox;

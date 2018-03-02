const fs = require('fs');
const chalk = require('chalk');
const postCssJs = require('postcss-js');
const postcss = require('postcss');
const extname = require('../utils/get-extension');
const noExt = require('../utils/no-extension');
const objToArr = require('../utils/obj-to-arr');
const changeProps = require('./properties');

function main(code) {
    let css = postCssJs.objectify(postcss.parse(code));
    css = changeProps(css);

    let lazy = postcss().process(css, {parser: postCssJs});
    return lazy;
}

module.exports = function core(code) {
    let output = {err: null, data: null};

    let lstat;

    try {
        output.data = main(code)
    } catch (error) {
        output.err = error;
    }
    return output;
};

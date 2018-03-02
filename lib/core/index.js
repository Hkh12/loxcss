const fs = require('fs');
const chalk = require('chalk');
const postCssJs = require('postcss-js');
const postcss = require('postcss');
const extname = require('../utils/get-extension');
const noExt = require('../utils/no-extension');
const objToArr = require('../utils/obj-to-arr');
const changeProps = require('./properties');

function main(file) {
    let css = postCssJs.objectify(postcss.parse(fs.readFileSync(file)));
    css = changeProps(css);
    
    let lazy = postcss().process(css, {parser: postCssJs});
    return lazy;
}

module.exports = function core(target, cb) {
    target = target || '.';

    let output = {err: null, data: null};

    let lstat;

    try {
        lstat = fs.lstatSync(target);
        if (lstat.isFile()) {
            if (extname(target) !== 'css') {
                throw new Error(`${target} is not a CSS file.`)
            }
            output.data = main(target)
        }
    } catch (error) {
        output.err = error;
    }
    return output;
};

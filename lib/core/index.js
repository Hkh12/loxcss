const fs = require('fs');
const chalk = require('chalk');
const postCssJs = require('postcss-js');
const postcss = require('postcss');
const extname = require('../utils/get-extension');
const noExt = require('../utils/no-extension');
const objToArr = require('../utils/obj-to-arr');
const changeProps = require('./properties');
const {Spinner} = require('cli-spinner');
const readline = require('readline');

function main(file) {
    let timeStamp = Date.now();
    if (extname(file) !== 'css') {
        return {err: 'not-css'};
    } else {
        let css = postCssJs.objectify(postcss.parse(fs.readFileSync(file)));
        let cssArr = objToArr(css);

        cssArr.v = cssArr.v.map(e => changeProps(e));

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        return new Promise(resolve => {
            postcss().process(css, { parser: postCssJs, from: undefined }).then(result => {
                if (result.css) {
                    resolve({data: result.css})
                } else {
                    resolve({err: result});
                }
            });
        });
    }
}

module.exports = function core(target, config) {
    target = target || '.';
    fs.lstat(target, (err, out) => {
        if (err){
            return {err};
        } else {
            if (out.isFile()) {
                main(target)
            } else if (out.isDirectory()) {
                fs.readdir(target, (err, items) => {
                    items.filter(e => extname(e) === 'css' && noExt(e).split('.').reverse()[0] !== 'css').forEach(e => {main(e)})
                })
            } else {
                return {err: 'not-file-or-dir'};
            }
        }
    })
};

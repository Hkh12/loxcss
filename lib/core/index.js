const fs = require('fs');
const chalk = require('chalk');
const postCssJs = require('postcss-js');
const postcss = require('postcss');
const extname = require('../utils/get-extension');
const objToArr = require('../utils/obj-to-arr');
const changeProps = require('./properties');

module.exports = function core(file, config) {
    fs.lstat(file, (err, out) => {
        if (err){
            console.log(`${chalk.red.bold('An error occured:')} \n\n${chalk.yellow(err)}`);
        } else {
            if (out.isFile()) {
                if (extname(file) !== 'css') {
                    console.log(chalk.red.bold(`Error: ${file} is not a css file.`))
                } else {
                    let {v, p} = objToArr(postCssJs.objectify(postcss.parse(fs.readFileSync(file))));

                    v = v.map(e => changeProps(e));

                    console.log(v);
                }
            }
        }
    })
};

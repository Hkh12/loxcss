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
        console.log(chalk.red.bold(`Error: ${file} is not a css file.`))
    } else {
        let css = postCssJs.objectify(postcss.parse(fs.readFileSync(file)));
        let cssArr = objToArr(css);

        cssArr.v = cssArr.v.map(e => changeProps(e));

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        postcss().process(css, { parser: postCssJs, from: undefined }).then(result => {
            let spinner = new Spinner('Processing...')
            spinner.start()

            fs.writeFile(`${noExt(file)}.mirror.css`, result.css, (err, data, stats) => {
                spinner.stop()
                readline.clearLine(rl, 0)
                readline.clearLine()
                if (err) {
                    throw err;
                } else {
                    console.log(chalk.green.bold('\n✔️  Mirrored successfully!'));

                    timeStamp = Date.now() - timeStamp;

                    console.log(chalk.bold(`⌚ Done in ${timeStamp / 1000} seconds.\n`));
                }
                rl.close()
            });

        });
        // let code = fs.readFileSync(file).toString();
        // let root = postcss.parse(code);
        // let result = {};
        // for (var i = 0; i < root.nodes.length; i++) {
        //     let node = root.nodes[i];
        //     if (node.type === 'rule') {
        //         let styles = {};
        //         for (var i = 0; i < node.nodes.length; i++) {
        //             let st = node.nodes[i];
        //             styles[st.prop] = st.value;
        //         }
        //         result[node.selector] = styles
        //     }
        // }
    }
}

module.exports = function core(target, config) {
    target = target || '.';
    fs.lstat(target, (err, out) => {
        if (err){
            console.log(`${chalk.red.bold('\n⚠️  An error occured:')}\n${chalk.yellow(err)}\n`);
        } else {
            if (out.isFile()) {
                main(target)
            } else if (out.isDirectory()) {
                fs.readdir(target, (err, items) => {
                    items.filter(e => extname(e) === 'css' && noExt(e).split('.').reverse()[0] !== 'css').forEach(e => {main(e)})
                })
            }
        }
    })
};

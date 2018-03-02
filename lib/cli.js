#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const cli = require('commander');
const core = require('./index');
const package = require('../package.json');
const extname = require('./utils/get-extension');
const noExt = require('./utils/no-extension');
const {Spinner} = require('cli-spinner');
const readline = require('readline');
const parseTime = require('./utils/parse-time');

let error = msg => {console.log(chalk.red(`⚠️  ${msg}`))}

cli
    .version(package.version, '-v, --version')
    .arguments('<target>')
    .option('-o, --output <filename>', 'specify the output file')
    .option('-S, --nostream', 'disable output streaming')
    .action((target, options) => {
        fs.lstat(target, (err, data) => {
            if (err) {
                error(err)
            } else if (data.isFile()) {
                console.log(' ');
                let _ = core(fs.readFileSync(target));

                let {output, watch, nostream} = options;

                let nextFileName = `${noExt(target)}.lox.css`

                if (output) {
                    nextFileName = `${output}.css`;
                }

                let sp = new Spinner('Processing...');

                sp.setSpinnerString(Spinner.spinners[8])

                sp.start()

                sp.stop(true)

                if (_.err) {
                    console.log('⚠️  ' + chalk.red(_.err));
                } else {
                    let time = Date.now();
                    let code = _.data;

                    if (nostream) {
                        console.log(chalk.cyan.bgBlue.bold('Streaming is disabled.\n'));
                        fs.writeFileSync(nextFileName, code)
                    } else {
                        let stream = fs.createWriteStream(nextFileName);

                        stream.write(code.css)

                        stream.end()
                    }

                    time = Date.now() - time
                    console.log(chalk.green(`✨  Mirrored successfully`));
                    console.log(`⌚  Done in ${chalk.italic(parseTime(time))}.`);
                    console.log('');
                }
            }
        })
    })
    .parse(process.argv)

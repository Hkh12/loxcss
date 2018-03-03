# loxcss
CSS mirroring tool ✨
## So, What does it do?
in the world of UI, locale-aware design in something hard to do.
but Lox makes this easy by reflecting CSS values.
## Get Started
### Installation
> **Not published yet!**

```shell
npm i loxcss
```
### Transform code
```javascript
const loxcss = require('loxcss');

const css = `body{
    margin-left: 5px
}`;

loxcss(css)

/*
the result is:

body{
    margin-right: 5px
}

and that's amazing ✨
*/
```
### CLI
Lox comes with a **CLI** tool inside.
#### help
```shell

Usage: cli [options] <target>


Options:

  -v, --version            output the version number
  -o, --output <filename>  specify the output file
  -S, --nostream           disable output streaming
  -h, --help               output usage information
```
#### transform a file
```shell
loxcss test.css
# result will be saved to test.lox.css
```
#### transform with no stream
if you turn on this option, CLI will use `fs.writeFile` instead of `fs.createWriteStream`:
```shell
loxcss test.css --nostream
```
#### custom output file
```shell
loxcss test.css -o transformed
# result will be saved to transformed.css
```
## Supported CSS properties
Lox can transform these CSS properties:
- Anything containing `-left` or `-right` (like `padding-right`)
- `direction`
- `text-align`
- `margin` and `padding` (`top right bottom left`)
- `float`
- `right`
- `left`
- `border-radius` if 4 values are assigned (`0px 1px 2px 3px`)

If you found any issues on this, just [report it](https://github.com/hkh12/loxcss/issues).

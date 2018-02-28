const path = require('path');

module.exports = function extname(file){
    let ext = path.extname(file);

    return ext.substring(1, ext.length).toLowerCase();

}

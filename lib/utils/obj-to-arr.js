module.exports = function(obj){
    if (typeof obj === 'object' && obj.constructor.name.toLowerCase() === 'object') {
        let result = {p: [], v: []};
        for (let key in obj) {
            result.p.push(key);
            result.v.push(obj[key])
        }
        return result;
    } else {
        return {p: [], v: []}
    }
};

module.exports = function(arr, a, b) {
    let c = arr[a];
    arr[a] = arr[b];
    arr[b] = c;
    return arr;
}

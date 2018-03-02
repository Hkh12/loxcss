module.exports = ms => {
    if (ms < 100) {
        return 'almost no time';
    } else if (ms < 1000) {
        return `${ms} milliseconds`;
    } else if (ms < 1000 && ms < 60000 ) {
        return `${ms / 1000} seconds`;
    } else {
        return `${ms/60000} minutes`;
    }
}

const Command = require('./command');


// -output string
// Output file (default "stdout")
// -threshold int
// Threshold of data points above which series are downsampled. (default 4000)
// -title string
// Title and header of the resulting HTML page (default "Vegeta Plot")
class Plotter extends Command {
    constructor(priorCommands, options) {
        super('plot', priorCommands, options);
    }
    output(value) {
        if (typeof value !== 'string') {
            throw TypeError('output must be a string');
        }
        return this.addFlag('output', value);
    }
    title(value) {
        if (typeof value !== 'string') {
            throw TypeError('title must be a string');
        }
        return this.addFlag('title', value);
    }
    threshold(value) {
        if (typeof value !== number || value < 0) {
            throw TypeError('threshold must be a positive integer');
        }
        return this.addFlag('threshold', value);
    }
}

module.exports = Plotter;
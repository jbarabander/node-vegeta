const Command = require('./command');
const toValues = ['json', 'csv', 'gob'];

class Encoder extends Command {
    constructor(priorCommands, options) {
        super('encode', priorCommands, options);
    }
    output(value) {
        if (typeof value !== 'string') {
            throw TypeError('output must be a string');
        }
        return this.addFlag('output', value);
    }
    to(value) {
        if (toValues.find(value)) {
            throw Error(`to must be either json, csv, or gob.  Got: ${value}`);
        }
        return this.addFlag('to', value);
    }
}

module.exports = Encoder;
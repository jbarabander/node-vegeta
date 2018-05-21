const Command = require('./command');
const dumperValues = ['json', 'csv'];

class Dumper extends Command {
    constructor(priorCommands, options) {
        super('dump', priorCommands, options);
    }
    inputs(value) {
        if (typeof value !== 'string') {
            throw Error('inputs must be a string');
        }
        return this.addFlag('inputs', value);
    }
    output(value) {
        if (typeof value !== 'string') {
            throw Error('output must be a string');
        }
        return this.addFlag('output', value);
    }
    dumper(value) {
        if (dumperValues.find(value)) {
            throw Error('reporter must be either json or csv');
        }
        return this.addFlag('dumper', value);
    }
}

module.exports = Dumper;
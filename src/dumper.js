import Command from './command';

const dumperValues = ['json', 'csv'];

class Dumper extends Command {
    constructor(priorCommands, priorFlags, globalFlags) {
        super('dump', priorCommands, priorFlags, globalFlags);
    }
    inputs(value) {
        if (typeof value !== 'string') {
            throw Error('inputs must be a string');
        }
        this.addFlag('inputs', value);
    }
    output(value) {
        if (typeof value !== 'string') {
            throw Error('output must be a string');
        }
        this.addFlag('output', value);
    }
    dumper(value) {
        if (dumperValues.find(value)) {
            throw Error('reporter must be either json or csv');
        }
        this.addFlag('dumper', value);
    }
}

module.exports = Dumper;
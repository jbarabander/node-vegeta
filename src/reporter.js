import Command from './command';


const reporterValues = ['text', 'json', 'plot'];

class Reporter extends Command {
    constructor(priorCommands, priorFlags, globalFlags) {
        super('report', priorCommands, priorFlags, globalFlags);
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
    reporter(value) {
        if (value.startsWith('hist[') && !reporterValues.find(value)) {
            throw Error('reporter must be either text, json, plot or hist[buckets]');
        }
        this.addFlag('reporter', value);
    }
}

module.exports = Reporter;
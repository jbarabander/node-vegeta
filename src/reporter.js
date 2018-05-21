const Command = require('./command');
const reporterValues = ['text', 'json', 'plot'];

class Reporter extends Command {
    constructor(priorCommands) {
        super('report', priorCommands);
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
        this.addFlag('output', value);
    }
    reporter(value) {
        if (value.startsWith('hist[') && !reporterValues.find(value)) {
            throw Error('reporter must be either text, json, plot or hist[buckets]');
        }
        return this.addFlag('reporter', value);
    }
}

module.exports = Reporter;
const { convertToDuration } = require('./utils');
const Command = require('./command');
const reporterValues = ['text', 'json', 'plot'];

class Reporter extends Command {
    constructor(priorCommands, options) {
        super('report', priorCommands, options);
    }
    every(value) {
        const convertedVal = convertToDuration(value);
        if (typeof convertedVal !== 'string') {
            throw TypeError('every is not a string or number');
        }
        return this.addFlag('every', convertedVal);
    }
    output(value) {
        if (typeof value !== 'string') {
            throw TypeError('output must be a string');
        }
        this.addFlag('output', value);
    }
    type(value) {
        if (!value.startsWith('hist[') && !reporterValues.find(value)) {
            throw Error('reporter must be either text, json, plot or hist[buckets]');
        }
        return this.addFlag('type', value);
    }
}

module.exports = Reporter;
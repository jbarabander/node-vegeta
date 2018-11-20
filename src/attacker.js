const { isInteger, createCommand, validateFile, convertToDuration } = require('./utils');
const Command = require('./command');
const Dumper = require('./dumper');
const Reporter = require('./reporter');

class Attacker extends Command {
    constructor(priorCommands, options) {
        super('attack', priorCommands, options);
    }
    body(file) {
        const validationErr = validateFile(file);
        if (validationErr) throw validationErr;
        return this.addFlag('body', file);
    }
    cert(value) {
        const validationErr = validateFile(value);
        if (validationErr) throw validationErr;
        return this.addFlag('cert', value);
    }
    duration(value) {
        const convertedVal = convertToDuration(value);
        if (typeof convertedVal !== 'string') {
            throw Error('duration flag is not a string or number');
        }
        return this.addFlag('duration', convertedVal);
    }
    header(name, value) {
        if (!value) {
            throw Error('header must have both name and value')
        }
        return this.addFlag('header', `${name}=${value}`, false);
    }
    http2(value = true) {
        if (typeof value !== 'boolean') {
            throw Error('http2 must be a boolean');
        }
        return this.addFlag('http2', value ? null : 'false');
    }
    insecure(value = true) {
        if (typeof value !== 'boolean') {
            throw Error('insecure must be a boolean');
        }
        if (!value) {
            return this.removeFlag('insecure');
        }
        return this.addFlag('insecure', null);
    }
    keepalive(value = true) {
        if (typeof value !== 'boolean') {
            throw Error('keepalive must be a boolean');
        }
        return this.addFlag('keepalive', value ? null : 'false');
    }
    key(value) {
        if (typeof value !== 'string') {
            throw Error('key must be a string');
        }
        return this.addFlag('key', value);
    }
    laddr(value) {
        if (typeof value !== 'string') {
            throw Error('laddr must be a string');
        }
        return this.addFlag('laddr', value);
    }
    lazy(value = true) {
        if (typeof value !== 'boolean') {
            throw Error('lazy must be a boolean');
        }
        if (!value) {
            return this.removeFlag('lazy');
        }
        return this.addFlag('lazy', null);
    }
    output(value) {
        if (typeof value !== 'string') {
            throw Error('output must be a string');
        }
        return this.addFlag('output', value);
    }
    rate(value) {
        if (!isInteger(value) || value < 0) {
            throw Error('rate must be a positive integer');
        }
        return this.addFlag('rate', value);
    }
    redirects(value) {
        if (isInteger(value)) {
            throw Error('redirects must be a number');
        }
        return this.addFlag('redirects', value);
    }
    rootCerts(value) {
        if (typeof value !== 'string') {
            throw Error('root-certs must be a string');
        }
        return this.addFlag('root-certs', value);
    }
    targets(file) {
        const validationErr = validateFile(file);
        if (validationErr) throw validationErr;
        return this.addFlag('targets', file);
    }
    timeout(value) {
        const convertedVal = convertToDuration(value);
        if (typeof convertedVal !== 'string') {
            throw Error('duration flag is not a string or number');
        }
        return this.addFlag('timeout', convertedVal);
    }
    workers(value) {
        if (isInteger(value) || value < 0) {
            throw Error('workers must be a positive integer');
        }
        return this.addFlag('workers', value);
    }
    dump() {
        return new Dumper(this.commands);
    }
    report() {
        return new Reporter(this.commands);
    }
}

module.exports = Attacker;
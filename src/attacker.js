const { isInteger, isObject, createCommand, validateFile, convertToDuration, validateResolver, isValidRateStr } = require('./utils');
const Command = require('./command');
const Reporter = require('./reporter');
const Encoder = require('./encoder');
const Plotter = require('./plotter');

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
    connections(value) {
        if (!isInteger(value) || value <= 0) {
            throw Error('connections must be a positive integer');
        }
        return this.addFlag('connections', value);
    }
    duration(value) {
        const convertedVal = convertToDuration(value);
        if (typeof convertedVal !== 'string') {
            throw TypeError('duration flag is not a string or number');
        }
        return this.addFlag('duration', convertedVal);
    }
    format(value) {
        if (typeof value !== 'string') {
            throw TypeError('format flag is not a string');
        }
        let normalizedValue = value.toLowerCase().trim();
        if (['http', 'json'].indexOf(normalizedValue) === -1) {
            throw Error(`format flag expected to be http or json got: ${value} instead`);
        }
        return this.addFlag('format', normalizedValue);
    }
    h2c(value = true) {
        if (typeof value !== 'boolean') {
            throw TypeError('h2c must be a boolean');
        }
        if (!value) {
            return this.removeFlag('h2c');
        }
        return this.addFlag('h2c', null);
    }
    header(name, value) {
        if (!value) {
            throw Error('header must have both name and value')
        }
        return this.addFlag('header', `${name}=${value}`, false);
    }
    http2(value = true) {
        if (typeof value !== 'boolean') {
            throw TypeError('http2 must be a boolean');
        }
        return this.addFlag('http2', value ? null : 'false');
    }
    insecure(value = true) {
        if (typeof value !== 'boolean') {
            throw TypeError('insecure must be a boolean');
        }
        if (!value) {
            return this.removeFlag('insecure');
        }
        return this.addFlag('insecure', null);
    }
    keepalive(value = true) {
        if (typeof value !== 'boolean') {
            throw TypeError('keepalive must be a boolean');
        }
        return this.addFlag('keepalive', value ? null : 'false');
    }
    key(value) {
        if (typeof value !== 'string') {
            throw TypeError('key must be a string');
        }
        return this.addFlag('key', value);
    }
    laddr(value) {
        if (typeof value !== 'string') {
            throw TypeError('laddr must be a string');
        }
        return this.addFlag('laddr', value);
    }
    lazy(value = true) {
        if (typeof value !== 'boolean') {
            throw TypeError('lazy must be a boolean');
        }
        if (!value) {
            return this.removeFlag('lazy');
        }
        return this.addFlag('lazy', null);
    }
    maxBody(value = -1) {
        if (typeof value !== 'number' || (value < 0 && value !== -1)) {
            throw TypeError('max-body must be a number and can only be -1, or greater than or equal to 0');
        }
        return this.addFlag('max-body', value);
    }
    name(value) {
        if (typeof value !== 'string') {
            throw TypeError('name must be a string');
        }
        return this.addFlag('name', value);
    }
    output(value) {
        if (typeof value !== 'string') {
            throw TypeError('output must be a string');
        }
        return this.addFlag('output', value);
    }
    rate(value) {
        if (!isValidRateStr(value) || !isInteger(value) || value < 0) {
            throw TypeError('rate must be a positive integer or a valid flexRate string (ex: 50/m)');
        }
        return this.addFlag('rate', value);
    }
    redirects(value) {
        if (!isInteger(value) || value < 0) {
            throw TypeError('redirects must be an integer');
        }
        return this.addFlag('redirects', value);
    }
    resolvers(value) {
        let isArr = Array.isArray(value);
        let valueArr = !Array.isArray(value) ? value : [value];
        valueArr.forEach((resolver) => {
            validateResolver(resolver);
        });
        let resolverStr = valueArr.map((resolver) => `${resolver.ip}:${resolver.port}`).join(',');
        return this.addFlag('resolvers', resolverStr);
    }
    rootCerts(value) {
        if (typeof value !== 'string') {
            throw TypeError('root-certs must be a string');
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
            throw TypeError('duration flag is not a string or number');
        }
        return this.addFlag('timeout', convertedVal);
    }
    unixSocket(value) {
        if (typeof value !== 'string') {
            throw TypeError('unix-socket must be a string');
        }
        this.addFlag('unix-socket', value);
    }
    workers(value) {
        if (isInteger(value) || value < 0) {
            throw TypeError('workers must be a positive integer');
        }
        return this.addFlag('workers', value);
    }
    report() {
        return new Reporter(this.commands);
    }
    plot() {
        return new Plotter(this.commands);
    }
    encode() {
        return new Encoder(this.commands);
    }
}

module.exports = Attacker;

const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const duplexSpawn = require('duplex-child-process').spawn;

const isInteger = (value) => parseInt(value, 10) === value;
const isObject = (value) => typeof value === 'object' && value !== null;
const validateFile = (file) => {
    if (typeof file !== 'string') {
        return TypeError('file flag is not a string');
    }
    if (path.isAbsolute(file)) return null;
    const fullPath = path.join(process.cwd(), file);
    if(!fs.existsSync(fullPath)) {
        return Error(`Cannot find file: ${fullPath}`);
    }
    return null;
}

let validateResolver = (resolver) => {
    if (!isObject(resolver)) {
        throw TypeError('resolver must be an object');
    }
    if (typeof resolver.ip !== 'string') {
        throw TypeError(`resolver.ip must be a string, instead got: ${resolver.ip}`);
    }
    if (isInteger(resolver.port)) {
        throw TypeError(`resolver.port must be an integer, instead got: ${resolver.port}`);
    }
}

let rateStrRegex = /\d+\/(ns|us|µs|ms|s|m|h)/;

let isValidRateStr = (rate) => {
    if (typeof rate !== 'string') {
        return false;
    }
    return rateStrRegex.test(rate);
}

const transformFlag = (name, value) => {
    const valueStr = value === null || value === undefined ?  '' : `=${value}`;
    if (!name && !valueStr) {
        return '';
    }
    return `-${name}${valueStr}`
}

const transformFlags = (flags) => {
    return flags.map((flag) => transformFlag(flag.name, flag.value));
}

const createCommandOptions = ({name, flags, globalFlags}) => {
    const parsedGlobalFlags = transformFlags(globalFlags);
    const parsedCommandFlags = transformFlags(flags);
    const allOptions = parsedGlobalFlags.concat([name], parsedCommandFlags);
    return allOptions;
}

const createCommand = (config) => {
    const options = createCommandOptions(config);
    const command = spawn('vegeta', options);
    command.stderr.setEncoding('utf-8');
    return command;
}

const createStream = (config) => {
    const options = createCommandOptions(config);
    return duplexSpawn('vegeta', options);
}

const convertToDuration = (value) => typeof value === 'number' ? `${value}ms` : value;

module.exports = {
    isInteger,
    transformFlag,
    transformFlags,
    createCommand,
    createStream,
    validateFile,
    validateResolver,
    isValidRateStr,
    convertToDuration
};
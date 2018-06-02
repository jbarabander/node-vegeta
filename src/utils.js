const spawn = require('child_process').spawn;
const duplexSpawn = require('duplex-child-process').spawn;

const isInteger = (value) => parseInt(value, 10) === value;

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
    return spawn('vegeta', options);
}

const createStream = (config) => {
    const options = createCommandOptions(config);
    return duplexSpawn('vegeta', options);
}

module.exports = {
    isInteger,
    transformFlag,
    transformFlags,
    createCommand,
    createStream,
};
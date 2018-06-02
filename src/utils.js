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

const createCommandObj = (config) => {
    const {name, flags, globalFlags} = config;
    const command = config.command ? config.command : 'vegeta';
    const parsedGlobalFlags = transformFlags(globalFlags);
    const parsedCommandFlags = transformFlags(flags);
    const allOptions = parsedGlobalFlags.concat([name], parsedCommandFlags);
    return { command, options: allOptions};
}

const createCommand = (config) => {
    const { command, options } = createCommandObj(config);
    return spawn(command, options);
}

const createStream = (config) => {
    const { command, options } = createCommandObj(config);
    return duplexSpawn(command, options);
}

module.exports = {
    isInteger,
    transformFlag,
    transformFlags,
    createCommand,
    createStream,
};
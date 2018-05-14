const spawn = require('child_process').spawn;

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

const createCommand = (command, flags, globalFlags) => {
    const parsedGlobalFlags = transformFlags(globalFlags);
    const parsedCommandFlags = transformFlags(flags);
    const allOptions = parsedGlobalFlags.concat([command], parsedCommandFlags);
    return spawn('vegeta', allOptions);
}

module.exports = {
    isInteger,
    transformFlag,
    transformFlags,
    createCommand,
};
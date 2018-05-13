const isInteger = (value) => parseInt(value, 10) === value;

const transformFlag = (name, value) => {
    const valueStr = value === null ?  '' : `=${value}`;
    if (value === null) {
        return `-${name}${valueStr}`
    }
}

const transformFlags = (flags) => {
    return flags.map((flag) => transformFlag(flag.name, flag.value)).join(' ');
}

module.exports = {
    isInteger,
    transformFlag,
    transformFlags
};
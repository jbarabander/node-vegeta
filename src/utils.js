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

module.exports = {
    isInteger,
    transformFlag,
    transformFlags
};
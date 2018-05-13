const { spawn, exec } = require('child_process');
const { isInteger, transformFlags } = require('./utils');

const GLOBAL_FLAGS = {
    cpus: isInteger,
    profile: (value) => typeof value === 'string',
    version: () => true
}

class Command {
    constructor(command = null, priorCommands = [], priorFlags = [], globalFlags = []) {
        this.commands = priorCommands.slice();
        this.flags = priorFlags.slice();
        this.globalFlags = globalFlags.slice();
        this.currentCommand = command;
        this.currentFlags = [];
        this.currentGlobalFlags = [];
        this.flagsHash = {};
        this.flags.push(this.currentFlags);
        this.commands.push(this.currentCommand);
        this.globalFlags.push(this.currentGlobalFlags);
    }
    addFlag(name, value = null, overwrite = true) {
        const newFlag = {name, value};
        if(!this.flagsHash[name] || !overwrite) {
            this.currentFlags.push(newFlag);
        }
        if (overwrite) {
            this.flagsHash[name] = newFlag;
        }
        return this;
    }
    removeFlag(name) {
        if (this.flagsHash[name]) {
            const foundIndex = this.currentFlags.indexOf(this.flagsHash[name]);
            delete this.flagsHash[name];
            this.currentFlags.splice(foundIndex, 1);
        }
        return this;
    }
    addGlobal(name, value = null) {
        if (GLOBAL_FLAGS[name] && GLOBAL_FLAGS[name](value)) {
            this.currentGlobalFlags = this.currentGlobalFlags.filter((flag) => flag.name !== name);
            this.currentGlobalFlags.push({name, value});
        }
        return this;
    }
    process() {
        return this.commands.reduce((prev, command, i) => {
            const flags = this.flags[i];
            const globalFlags = this.globalFlags[i];
            const parsedGlobalFlags = transformFlags(globalFlags);
            const parsedCommandFlags = transformFlags(flags);
            const allOptions = parsedGlobalFlags.concat([command], parsedCommandFlags);
            let commandToGiveBack = spawn('vegeta', allOptions);
            if (prev) {
                prev.stdout.on('data', (data) => {
                    commandToGiveBack.stdin.write(data);
                });
                prev.on('close', (code) => {
                    commandToGiveBack.stdin.end();
                })
            }
            return commandToGiveBack;
        }, null);
    }
}

module.exports = Command;
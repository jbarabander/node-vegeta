const { spawn, exec } = require('child_process');
const { isInteger, createCommand } = require('./utils');

const GLOBAL_FLAGS = {
    cpus: isInteger,
    profile: (value) => typeof value === 'string',
    version: () => true
}

class Command {
    constructor(name = null, priorCommands = [], options = {flags: [], globalFlags: []}) {
        this.commands = priorCommands.slice().map((command) => ({
            name: command.name,
            flags: command.flags.slice(),
            globalFlags: command.globalFlags.slice(),
        }));
        this.currentCmd = {
            name,
            flags: options.flags || [],
            globalFlags: options.globalFlags || []
        };
        this.flagsHash = {};
        this.commands.push(this.currentCmd);
    }
    addFlag(name, value = null, overwrite = true) {
        const newFlag = {name, value};
        if(!this.flagsHash[name] || !overwrite) {
            this.currentCmd.flags.push(newFlag);
        }
        if (overwrite) {
            this.flagsHash[name] = newFlag;
        }
        return this;
    }
    removeFlag(name) {
        if (this.flagsHash[name]) {
            const foundIndex = this.currentCmd.flags.indexOf(this.flagsHash[name]);
            delete this.flagsHash[name];
            this.currentCmd.flags.splice(foundIndex, 1);
        }
        return this;
    }
    addGlobal(name, value = null) {
        if (GLOBAL_FLAGS[name] && GLOBAL_FLAGS[name](value)) {
            this.currentCmd.globalFlags = this.currentCmd.globalFlags.filter((flag) => flag.name !== name);
            this.currentCmd.globalFlags.push({name, value});
        }
        return this;
    }
    process() {
        return this.commands.reduce((prev, command, i) => {
            const flags = command.flags;
            const globalFlags = command.globalFlags;
            let commandToGiveBack = createCommand(command.name, flags, globalFlags);
            if (prev) {
                prev.stdout.pipe(commandToGiveBack.stdin);
            }
            return commandToGiveBack;
        }, null);
    }
    pipe(dest) {
        const currentCommand = this.process();
        if (dest instanceof Command) {
            const destCommand = dest.process();
            currentCommand.stdout.pipe(destCommand.stdin);
            return destCommand.stdout;
        }
        currentCommand.stdout.pipe(dest);
        return dest;
    }
    on(event, cb) {
        const currentCommand = this.process();
        currentCommand.on(event, cb);
        return currentCommand;
    }
    out() {
        return this.process().stdout;
    }
    in() {
        return this.process().stdin;
    }
}

module.exports = Command;
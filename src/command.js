const { spawn, exec } = require('child_process');
const { isInteger, createCommand, createStream } = require('./utils');

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
        const flags = options.flags || [];
        this.currentCmd = {
            name,
            flags,
            globalFlags: options.globalFlags || []
        };
        this.flagsHash = flags.reduce((prev, curr) => {
            if(curr.name) {
                prev[curr.name] = curr;
            }
            return prev;
        }, {});
        this.commands.push(this.currentCmd);
    }
    generateCopy() {
        const CurrentCommand = this.constructor;
        const args = [
            this.commands.slice(0, this.commands.length - 1),
            {flags: this.currentCmd.flags, globalFlags: this.currentCmd.globalFlags}
        ];
        if (CurrentCommand === Command) {
            args.unshift(this.currentCmd.name);
        }
        return new CurrentCommand(...args);
    }
    addFlag(name, value = null, overwrite = true) {
        const newCopy = this.generateCopy();
        const newFlag = {name, value};
        if(!this.flagsHash[name] || !overwrite) {
            newCopy.currentCmd.flags.push(newFlag);
        }
        if (overwrite) {
            this.flagsHash[name] = newFlag;
        }
        return newCopy;
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
        const newCopy = this.generateCopy();
        if (GLOBAL_FLAGS[name] && GLOBAL_FLAGS[name](value)) {
            newCopy.currentCmd.globalFlags = newCopy.currentCmd.globalFlags.filter((flag) => flag.name !== name);
            newCopy.currentCmd.globalFlags.push({name, value});
        }
        return newCopy;
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
    stream() {
        return this.commands.reduce((prev, command, i) => {
            const flags = command.flags;
            const globalFlags = command.globalFlags;
            let commandToGiveBack = createStream(command.name, flags, globalFlags);
            if (prev) {
                prev.stdout.pipe(commandToGiveBack);
            }
            return commandToGiveBack;
        }, null);
    }
    pipe(dest, ...options) {
        const currentCommand = this.stream();
        if (dest instanceof Command) {
            const destCommand = dest.stream();
            currentCommand.pipe(destCommand, ...options);
            return destCommand;
        }
        currentCommand.pipe(dest, ...options);
        return dest;
    }
    on(event, cb) {
        const currentCommand = this.stream();
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
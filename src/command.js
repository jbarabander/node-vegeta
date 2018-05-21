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
        const newCopy = this.generateCopy();
        if (this.flagsHash[name]) {
            const foundIndex = newCopy.currentCmd.flags.indexOf(newCopy.flagsHash[name]);
            delete newCopy.flagsHash[name];
            newCopy.currentCmd.flags.splice(foundIndex, 1);
        }
        return newCopy;
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
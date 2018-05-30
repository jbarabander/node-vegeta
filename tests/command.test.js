const Command = require('../src/command');
const { expect, assert } = require('chai');
const ChildProcess = require('child_process').ChildProcess;

describe('Command', () => {
    it('should have the correct prior commands when provided in constructor', (done) => {
        const command = new Command('report', [
            {name: 'attack', flags: [{name: 'targets', value: 'targets.txt'}], globalFlags: []}
        ]);
        const expectedCommands = [
            {name: 'attack', flags: [{name: 'targets', value: 'targets.txt'}], globalFlags: []},
            {name: 'report', flags: [], globalFlags: []}
        ];
        expect(command.commands).to.deep.equal(expectedCommands);
        done();
    });
    describe('addFlag', () => {
        it('should return new version of command', (done) => {
            const command = new Command();
            const newCommand = command.addFlag('foo', 'bar');
            expect(newCommand).to.be.an.instanceOf(Command);
            expect(newCommand).to.not.equal(command);
            done();
        });
    });
    describe('addGlobal', () => {
        it('should return new version of command', (done) => {
            const command = new Command();
            const newCommand = command.addGlobal('cpus', 2);
            expect(newCommand).to.be.an.instanceOf(Command);
            expect(command).to.not.equal(newCommand);
            done();
        });
    });
    describe('process', () => {
        it('should execute the command and return back an instance of child process', (done) => {
            const command = new Command();
            const process = command.process();
            expect(process).to.be.an.instanceOf(ChildProcess);
            done();
        });
    });
    describe('stream', () => {
        it('should execute the command and return back a duplex stream', (done) => {
            const command = new Command();
            const stream = command.stream();
            assert.isFunction(stream.pipe);
            assert.isFunction(stream.on);
            assert.isFunction(stream._read);
            assert.isFunction(stream._write);
            done();
        })
    })
})
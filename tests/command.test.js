const Command = require('../src/command');
const expect = require('chai').expect;

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
})
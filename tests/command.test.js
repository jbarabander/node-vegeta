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
})
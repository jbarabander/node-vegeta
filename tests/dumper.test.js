const Dump = require('../src/dumper');
const Command = require('../src/command');
const expect = require('chai').expect;

describe('Dumper', () => {
    it('should be an instance of Command', (done) => {
        const baseDump = new Dump();
        expect(baseDump).to.be.an.instanceof(Command);
        done();
    });
    it('should have the command name set to dump', (done) => {
        const baseDump = new Dump();
        expect(baseDump.currentCmd.name).to.equal('dump');
        done();
    });
});
const Dump = require('../src/dumper');
const expect = require('chai').expect;
describe('Dumper', () => {
    it('should have the command name set to dump', (done) => {
        const baseDump = new Dump();
        expect(baseDump.currentCmd.name).to.equal('dump');
        done();
    });
});
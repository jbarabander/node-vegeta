const Dump = require('../src/dumper');
const expect = require('chai').expect;
describe('Dumper', () => {
    it('should have the command name set to ', (done) => {
        const baseAttack = new Dump();
        expect(baseAttack.currentCmd.name).to.equal('dump');
        done();
    });
});
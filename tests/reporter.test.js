const Report = require('../src/reporter');
const expect = require('chai').expect;
describe('Reporter', () => {
    it('should have the command name set to ', (done) => {
        const baseAttack = new Report();
        expect(baseAttack.currentCmd.name).to.equal('report');
        done();
    });
});
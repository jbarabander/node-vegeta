const Report = require('../src/reporter');
const expect = require('chai').expect;
describe('Reporter', () => {
    it('should have the command name set to report', (done) => {
        const baseReport = new Report();
        expect(baseReport.currentCmd.name).to.equal('report');
        done();
    });
});
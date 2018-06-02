const Report = require('../src/reporter');
const expect = require('chai').expect;
const Command = require('../src/command');

describe('Reporter', () => {
    it('should be an instance of Command', (done) => {
        const baseReport = new Report();
        expect(baseReport).to.be.an.instanceof(Command);
        done();
    });
    it('should have the command name set to report', (done) => {
        const baseReport = new Report();
        expect(baseReport.currentCmd.name).to.equal('report');
        done();
    });
});
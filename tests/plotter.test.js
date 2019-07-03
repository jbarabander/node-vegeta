const Plot = require('../src/plotter');
const expect = require('chai').expect;
const Command = require('../src/command');

describe('Plotter', () => {
    it('should be an instance of Command', (done) => {
        const basePlot = new Plot();
        expect(basePlot).to.be.an.instanceof(Command);
        done();
    });
    it('should have the command name set to plot', (done) => {
        const basePlot = new Plot();
        expect(basePlot.currentCmd.name).to.equal('plot');
        done();
    });
});
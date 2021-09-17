const Attack = require('../src/attacker');
const Report = require('../src/reporter');
const Encode = require('../src/encoder');
const Plot = require('../src/plotter');
const Command = require('../src/command');
const path = require('path');
const expect = require('chai').expect;

describe('Attacker', () => {
    const targetsPath = path.join(__dirname, 'targets.txt');
    it('should be an instance of Command', (done) => {
        const baseAttack = new Attack();
        expect(baseAttack).to.be.an.instanceof(Command);
        done();
    });
    it('should have the command name set to attack', (done) => {
        const baseAttack = new Attack();
        baseAttack.body('./tests/body.json');
        expect(baseAttack.currentCmd.name).to.equal('attack');
        done();
    });
    describe('report', () => {
        it('should return instance of report', (done) => {
            const actualAttack = new Attack();
            const report = actualAttack.report();
            expect(report).to.be.an.instanceof(Report);
            done();
        });
    });
    describe('encode', () => {
        it('should return instance of encode', (done) => {
            const encodeAttack = new Attack();
            const encode = encodeAttack.encode();
            expect(encode).to.be.an.instanceof(Encode);
            done();
        })
    });
    describe('plot', () => {
        it('should return instance of plot', (done) => {
            const plotAttack = new Attack();
            const plot = plotAttack.plot();
            expect(plot).to.be.an.instanceof(Plot);
            done();
        })
    });
});
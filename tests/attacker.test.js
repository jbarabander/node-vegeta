const Attack = require('../src/attacker');
const Report = require('../src/reporter');
const Command = require('../src/command');
const Dump = require('../src/dumper');
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
        baseAttack.body('body.json');
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
    describe('dump', () => {
        it('should return instance of dump', (done) => {
            const dumpAttack = new Attack();
            const dump = dumpAttack.dump();
            expect(dump).to.be.an.instanceof(Dump);
            done();
        })
    });
});
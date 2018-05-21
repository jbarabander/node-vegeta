const Attack = require('../src/attacker');
const Report = require('../src/reporter');
const path = require('path');
const expect = require('chai').expect;
describe('Attacker', () => {
    it('should have the command name set to attack', (done) => {
        const baseAttack = new Attack();
        baseAttack.body('body.json');
        expect(baseAttack.currentCmd.name).to.equal('attack');
        done();
    });
    it('should be able to chain into a report', (done) => {
        const actualAttack = new Attack();
        const report = actualAttack
            .targets(path.join(__dirname, 'targets.txt'))
            .duration('2s')
            .rate(4)
            .report();
        expect(report).to.be.an.instanceof(Report);
        done();
    });
});
const Attack = require('../src/attacker');
const expect = require('chai').expect;
describe('Attacker', () => {
    it('should have the command name set to attack', (done) => {
        const baseAttack = new Attack();
        expect(baseAttack.currentCmd.name).to.equal('attack');
        done();
    });
});
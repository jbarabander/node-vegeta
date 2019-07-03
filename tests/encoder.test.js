const Encode = require('../src/Encodeter');
const expect = require('chai').expect;
const Command = require('../src/command');

describe('Encodeter', () => {
    it('should be an instance of Command', (done) => {
        const baseEncode = new Encode();
        expect(baseEncode).to.be.an.instanceof(Command);
        done();
    });
    it('should have the command name set to encode', (done) => {
        const baseEncode = new Encode();
        expect(baseEncode.currentCmd.name).to.equal('encode');
        done();
    });
});
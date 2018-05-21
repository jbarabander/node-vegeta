const Reporter = require('./reporter');
const Attacker = require('./attacker');
const Dumper = require('./dumper');

Attacker.prototype.report = function () {
    return new Reporter(this.commands, this.flags, this.globalFlags);
}

Attacker.prototype.dump = function () {
    return new Dumper(this.commands, this.flags, this.globalFlags);
}

module.exports = {
    Report: Reporter,
    Attack: Attacker,
    Dump: Dumper,
};
const Reporter = require('./reporter');
const Attacker = require('./attacker');
const Dumper = require('./dumper');

Attacker.prototype.report = 
Dumper.prototype.report =
Reporter.prototype.report = function () {
    return new Reporter(this.commands, this.flags, this.globalFlags);
}

Attacker.prototype.dump =
Dumper.prototype.dump =
Reporter.prototype.dump = function () {
    return new Dumper(this.commands, this.flags, this.globalFlags);
}

Attacker.prototype.attack =
Dumper.prototype.attack =
Reporter.prototype.attack = function () {
    return new Attacker(this.commands, this.flags, this.globalFlags);
}

module.exports = {
    Report: Reporter,
    Attack: Attacker,
    Dump: Dumper,
};
const Attack = require('../..').Attack;
const testAttack = new Attack(); // spawns an attack command
testAttack
    .targets('targets.txt')
    .rate(300) // ITS OVER NINE THOUSAND!!!
    .duration('1s')
    .report() // spawns the report command and pipes the results of the attack command to it
    .process() // fires off the actual process
    .stdout.on('data', (data) => {
        console.log('report', data.toString());
    })
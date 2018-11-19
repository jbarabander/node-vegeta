const Attack = require('../..').Attack;
const testAttack = new Attack(); // spawns an attack command
testAttack
    .targets('targets.txt')
    .rate(300)
    .duration('1s')
    .report()
    .process()
    .stdout.on('data', (data) => {
        console.log('report', data.toString());
    })
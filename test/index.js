const path = require('path');
const Attacker = require('../src').Attack;

const testAttacker = new Attacker();
testAttacker
    .body(path.join(__dirname, './body.json'))
    .targets(path.join(__dirname, './targets.txt'))
    .rate('50ms')
    .duration('1m')
    .report()
    .process()
    .stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    })
const path = require('path');
const { exec, spawn } = require('child_process');
const Attacker = require('../src').Attack;

const testAttacker = new Attacker();
testAttacker
    .body(path.join(__dirname, './body.json'))
    .targets(path.join(__dirname, './targets.txt'))
    .rate(50)
    .duration('5s')
    .report()
    .process()
    .stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

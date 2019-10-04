# scouter
VEGETA! WHAT DOES THE SCOUTER SAY ABOUT HIS POWER LEVEL?!?!

node.js bindings for the wonderful vegeta load-testing library.  See here: https://github.com/tsenart/vegeta

## About
Vegeta is an awesome load-testing library.  It makes load testing super stress-free and is overall a real joy to use.  However, currently there doesn't seem to be a library allowing you to use vegeta in a javascript context.  This library sets out to change this by exposing the CLI implementation of vegeta in the node.js environment.

NOTE: vegeta must be installed on your machine in order to use this library.  For help doing that see here: https://github.com/tsenart/vegeta#install

## Installation
```sh
npm install node-vegeta --save
```
or
```sh
yarn add node-vegeta
```

## Usage

### Basic
Using node-vegeta is very similar to using vegeta via CLI.  All vegeta commands are supported via node classes like so:
```js
const Attack = require('node-vegeta').Attack;
const testAttack = new Attack(); // spawns an attack command
testAttack
    .targets('targets.txt')
    .body('body.json')
    .rate(9001) // ITS OVER NINE THOUSAND!!!
    .duration('30s')
    .report() // spawns the report command and pipes the results of the attack command to it
    .process() // fires off the actual process
    .stdout.on('data', (data) => {
        console.log('report', data)
    })
```
All flags for `attack`, `encode`, `report`, and `plot` are also supported by the node interface.

### Streaming
This library supports streaming from the get-go.  It should be very easy to integrate with the wonderful streaming
ecosystem that nodejs supports

Example:
```js
const fs = require('fs');
const path = require('path');
const vegeta = require('node-vegeta');
const Attack = vegeta.Attack;
const Report = vegeta.Report;
const testAttack = new Attack();
const testReport = new Report();
const summaryStream = fs.createWriteStream(path.join(__dirname, 'summary.json'));
const resultsStream = fs.createWriteStream(path.join(__dirname, 'results.bin'));
const attackCommand = testAttack
    .body(path.join(__dirname, 'body.json'))
    .rate(500)
    .duration('5s')
    .process();
const reportCommand = testReport.type('json').process();

attackCommand.stdin.setEncoding('utf-8');
attackCommand.stdin.write('GET localhost:3000\n'); // fire the attack to localhost:3000
attackCommand.stdin.end();

attackCommand.stdout.pipe(resultsFile);  // stream results to the results file
attackCommand.stdout.pipe(reportCommand.stdin); // streams results to the report command
reportCommand.stdout.pipe(summaryFile); // stream report to the summary file
```

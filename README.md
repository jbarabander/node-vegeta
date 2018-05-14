# node-vegeta
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
baseAttack
    .targets('targets.txt')
    .body('body.json')
    .rate(500)
    .duration('5m')
    .report() // spawns the report command and pipes the results of the attack command to it
    .process() // fires off the actual process
    .stdout.on('data', (data) => {
        console.log('report', data)
    })
```
All flags for `attack`, `report`, and `dump` are also supported by the node interface.
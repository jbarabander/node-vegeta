const fs = require('fs');
const path = require('path');
const vegeta = require('../../src');
const Attack = vegeta.Attack;
const Report = vegeta.Report;
const testAttack = new Attack();
const testReport = new Report();
const summaryStream = fs.createWriteStream(path.join(__dirname, 'summary.json'));
const resultsStream = fs.createWriteStream(path.join(__dirname, 'results.bin'));
const attackCommand = testAttack
    .targets('targets.txt')
    .rate(500)
    .duration('5s')
    .stream();
const reportCommand = testReport.type('json').stream();

attackCommand.pipe(resultsStream);  // stream results to the results file
attackCommand.pipe(reportCommand); // streams results to the report command
reportCommand.pipe(summaryStream); // stream report to the summary file
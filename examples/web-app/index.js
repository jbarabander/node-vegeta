const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const archiver = require('archiver');
const vegeta = require('node-vegeta');
const Attack = vegeta.Attack;
const Report = vegeta.Report;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
})
app.post('/load-test', (req, res) => {
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });
    const url = req.body.url;
    const rate = req.body.rate;
    const attack = new Attack();
    const report = new Report();
    const attackCommand = attack.duration('15s').rate(parseInt(rate, 10) || 50).process();
    const reportCommand = report.reporter('json').process();
    attackCommand.stdin.setEncoding('utf-8');
    attackCommand.stdin.write(`GET ${url}`);
    attackCommand.stdin.end();
    attackCommand.stdout.pipe(reportCommand.stdin);

    archive.append(attackCommand.stdout, {name: 'results.bin'});
    archive.append(reportCommand.stdout, {name: 'summary.json'});
    archive.pipe(res);
    res.setHeader('Content-disposition', `attachment; filename=${url}-load-test.zip`);
    res.setHeader('Content-Type', 'application/zip, application/octet-stream');
    archive.finalize();
});

app.listen(3000, function () {
    console.log('listening on port 3000');
})
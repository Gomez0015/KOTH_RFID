const fs = require('fs');
const websocket = require('../websocket.js');

exports.getTeams = function(req, res) {
    let rawdata = fs.readFileSync('./db/db.json');
    let dbJson = JSON.parse(rawdata);
    res.send(dbJson.teams);
}

exports.incScore = function(req, res) {
    let rawdata = fs.readFileSync('./db/db.json');
    let dbJson = JSON.parse(rawdata);

    let team = dbJson.teams.find(team => team.id === parseInt(req.body.id));
    team.score++;

    let data = JSON.stringify(dbJson);
    fs.writeFileSync('./db/db.json', data);
    websocket.sendMessage(dbJson.teams);
    res.sendStatus(200)
}
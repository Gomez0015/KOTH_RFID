const WebSocket = require('ws');
const fs = require('fs');

var wss = null
const clients = new Map();7

getTeams = function() {
    let rawdata = fs.readFileSync('./db/db.json');
    let dbJson = JSON.parse(rawdata);
    return(dbJson.teams);
}

exports.setupSocketServer = () => {

  wss = new WebSocket.Server({ port: parseInt(process.env.PORT) + 1 });

  wss.on('connection', (ws) => {
    const id = uuidv4();
    const metadata = { id };

    clients.set(ws, metadata);

    data = getTeams()
    ws.send(JSON.stringify(data));

    ws.on("close", () => {
      clients.delete(ws);
    });
  });


  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  console.log(`websocket server listening on port ${parseInt(process.env.PORT) + 1}`);
 
}

exports.sendMessage = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}
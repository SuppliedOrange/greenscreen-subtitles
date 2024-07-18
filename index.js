const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");

const serverApp = express();

// Parse JSON bodies for this app. 
serverApp.use(bodyParser.json());

const server = http.createServer(serverApp);
const io = new Server(server);
const PORT = 4999;

/*
Accept requests under LOCALHOST:PORT(4999)/update_subtitles
Request must be { "text": String }
*/

serverApp.post('/update_subtitles', (req, res) => {

    if (!req.body.text) {
        res.send({
            success: false,
            error: "Did not get text. Request format is { text: String }"
        })
    }

    const subtitles = req.body.text;

    try {
        io.emit("subtitle_update", subtitles);
        res.send({
            success: true
        });
    }
    catch (e) {
        res.send({
            success: false,
            error: e.message
        })
    }

});

serverApp.get( '/', (_req, res) => {
    res.sendFile( path.resolve('index.html'));
})

io.on('connection', (_socket) => {
    console.log('Server connected to a web client.');
});

// Start the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

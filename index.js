const { app, BrowserWindow } = require('electron');
const express = require('express');
const bodyParser = require('body-parser');
const serverApp = express();
const http = require('http');

// Parse JSON bodies for this app. 
serverApp.use(bodyParser.json());

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
    mainWindow.webContents.send('subtitle_update', subtitles);
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

// Start the server
const server = http.createServer(serverApp);
const PORT = 4999;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Standard Electron App, modify width/height for yourself.
app.on('ready', () => {
  
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      backgroundThrottling: false,
    }

  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // This will make the `mainWindow` variable accessible in the serverApp.post callback
  global.mainWindow = mainWindow;
});

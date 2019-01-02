const { exec } = require('child_process');
const express = require('express');
const path = require('path');
const public = path.join(__dirname, 'public');

const app = express();
const port = 3121;
app.use(express.static(public));

// send commands to a running mpv process via ipc
// mpv --input-ipc-server=/tmp/mpvsocket example.mp4

app.get('/', (req, res) => res.sendFile(path.join(public, 'index.html')));

const mpvSocket = '/tmp/mpvsocket';

app.get('/play-pause', (req, res) => {
  const playPauseCycle = `echo '{ "command": ["cycle", "pause"] }' | socat - ${mpvSocket}`;
  exec(playPauseCycle);
  res.status(200).send();
});

app.get('/go-back', (req, res) => {
  const goBack = `echo '{ "command": ["seek", -15, "relative"]}' | socat - ${mpvSocket}`;
  exec(goBack);
  res.status(200).send();
});

app.listen(port, () => console.log(`app listening on port ${port}`));
const { exec } = require('child_process');
const express = require('express');
const { networkInterfaces } = require('os');
const path = require('path');

const public = path.join(__dirname, 'public');

const app = express();
const port = 80;
app.use(express.static(public));

app.get('/', (req, res) => res.sendFile(path.join(public, 'index.html')));

// socket location for ipc with mpv invoked with --input-ipc-server
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

const getNetworkIPAddress = () =>
  networkInterfaces()['en0'].find(elem => elem.address.startsWith('192')).address;

app.listen(port, () => console.log(`mpv remote listening on: ${getNetworkIPAddress()}`));

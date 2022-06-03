const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const public = path.join(__dirname, 'public');

const defaultPort = 3000;
const port = process.argv[2] ? Number.parseInt(process.argv[2], 10) : defaultPort;
const mpvSocket = '/tmp/mpvsocket';
const getcommandstr = (command) =>{
   return `echo ${command} | socat - ${mpvSocket}`; 
}

const app = express();
app.use(express.static(public));
app.get('/', (req, res) => res.sendFile(path.join(public, 'index.html')));

var goback=(res) => {
  res.redirect('/'); 
}

app.get('/play-pause', (req, res) => {
  const playPauseCycle = getcommandstr('cycle pause');
  exec(playPauseCycle);
  goback(res);
});

app.get('/go-forward', (req, res) => {
  const goForward = getcommandstr('keypress right');
  exec(goForward);
  goback(res);
});

app.get('/go-back', (req, res) => {
  const goBack = getcommandstr('keypress left');
  exec(goBack);
  goback(res);
});

app.get('/volume-up', (req, res) => {
  const volumeUp = getcommandstr('keypress 0');
  exec(volumeUp);
  goback(res);
});

app.get('/volume-down', (req, res) => {
  const volumeDown = getcommandstr('keypress 9');
  exec(volumeDown);
  goback(res);
});

app.get('/mute', (req, res) => {
  exec(getcommandstr('keypress m'));
  goback(res);
});

app.get('/quit', (req, res) => {
  exec(getcommandstr('quit'));
  goback(res);
});


app.listen(port, () => console.log(`mpv remote listening on: ${port}`));

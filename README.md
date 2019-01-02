# mpv-remote

mpv-remote is a client and server program to allow basic control of mpv from a phone/computer on the same network

### Installation

mpv-remote requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and start the server.

```sh
$ yarn install
$ node app.js
```

If the installation was successful, you'll see a message like:
```
mpv remote listening on: 192.168.0.xxx:3121
```
Now using a phone browser, visit the local network ip address from the above message, which should let you see the playback controls.

Now start `mpv` with ipc enabled:
```sh
$ mpv --input-ipc-server=/tmp/mpvsocket example.mp4
```

If everything is configured correctly, the play/pause and 15 second rewind buttons should control the media playback.





License
----

MIT

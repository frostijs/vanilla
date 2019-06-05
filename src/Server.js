/* eslint-disable no-console */
import chokidar from 'chokidar';
import compression from 'compression';
import config from '@config/app';
import cors from 'cors';
import express from 'express';
import spdy from 'spdy';
import fs from 'fs';
import os from 'os';
import path from 'path';
import redirect from 'redirect-https';
import 'colors';

import renderTemplate from '../lib/renderer';

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 1981;
const HOST = process.env.HOST || config.host;
const IS_PROD = ENV === 'production';

// DEFINE VARS
const app = express();
const watcher = chokidar.watch('./src');
const certDirectory = path.join(os.homedir(), '.nodecert');

let template = `${config.dir.src}/template.html`;

app.use(compression());
app.use(cors());

// UPDATE SERVER WHEN FILES CHANGE
if (!IS_PROD) {
  watcher.on('ready', () => {
    watcher.on('all', () => {
      Object.keys(require.cache).forEach((id) => {
        /* eslint-disable no-useless-escape */
        if (/[\/\\]src[\/\\]/.test(id) || /[\/\\].dist[\/\\]/.test(id)) {
          delete require.cache[id];
        }
      });
    });
  });
}

const staticDirs = {
  dist: config.dir.dist,
  src: config.dir.src
};

// SERVE STATIC FILES
if (HOST === 'firebase`') {
  template = `${path.join(__dirname, '../')}.dist/template.html`;
  staticDirs.dist = `${path.join(__dirname, '../')}.dist`;
  staticDirs.src = `${path.join(__dirname, '../')}public`;
} else if (HOST !== 'local') {
  template = `${path.join(__dirname, '../../')}src/template.html`;
  staticDirs.dist = `${path.join(__dirname, '../../')}.dist`;
  staticDirs.src = `${path.join(__dirname, '../../')}public`;
}

app.use(express.static(staticDirs.dist));
app.use(express.static(staticDirs.dist));

// RENDER REACT APP
app.get('/*', (req, res) => {
  try {
    const streamCSS = res.push(`${config.dir.dist}/app.css`, {
      status: 200, // optional
      method: 'GET', // optional
      request: {
        accept: '*/*'
      },
      response: {
        'content-type': 'text/css'
      }
    });

    streamCSS.end();

    const streamJS = res.push(`${config.dir.dist}/app.js`, {
      status: 200, // optional
      method: 'GET', // optional
      request: {
        accept: '*/*'
      },
      response: {
        'content-type': 'application/javascript'
      }
    });

    streamJS.end();
  } catch (err) {
    // SERVER PUSH NOT SUPPORTED
  }

  renderTemplate(template, req)
    .then((html) => {
      res.send(html);
    })
    .catch(() => {
      console.log('Error rendering template');
      res.send('Doh!');
    });
});

let keys = {};

if (HOST === 'local' || HOST === 'ssr') {
  app.locals.pretty = true;
  keys = {
    key: fs.readFileSync(path.join(certDirectory, 'localhost-key.pem')),
    cert: fs.readFileSync(path.join(certDirectory, 'localhost.pem'))
  };

  app.use(
    '/',
    redirect({
      body: '<!-- Hello there developer! Please use HTTPS instead -->'
    })
  );
} else if (HOST === 'firebase') {
  keys = {
    key: __dirname + '/key.pem', // eslint-disable-line
    cert: __dirname + '/cert.pem' // eslint-disable-line
  };
} else {
  keys = false;
}

let initServer;

if (keys) {
  initServer = (port) => {
    spdy.createServer(keys, app).listen(port, (error) => {
      if (error) {
        console.error(error); // eslint-disable-line
        return process.exit(1);
      }

      const host = `https://localhost:${port}`;

      return console.log(`\n Node server started at ${host}\n`); // eslint-disable-line
    });
  };
} else {
  initServer = (port) => {
    app.listen(port, () => {
      const host = `http://localhost:${port}`;
      console.log(`\n Node server started at ${host}\n`);
    });
  };
}

if (HOST !== 'firebase') {
  initServer(PORT);
} else {
  module.exports = app;
}

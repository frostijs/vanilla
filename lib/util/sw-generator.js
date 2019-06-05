/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '../../');

const ENABLE_SW = process.env.NODE_ENV === 'production' || process.env.ENABLE_SW;

const generateSW = (pkg) => {
  if (ENABLE_SW) {
    const src = `${ROOT_DIR}public/service-worker.js`;
    const dest = `${ROOT_DIR}.dist/service-worker.js`;

    fs.readFile(src, 'utf8', (readError, data) => {
      if (readError) {
        if (readError.code !== 'ENOENT') {
          console.log(readError);
        }
      } else {
        let sw = data;
        let revision = `${pkg.name}-${pkg.version}`;

        if (process.env.NODE_ENV !== 'production') {
          revision = `nocache-${Date.now()}`;
        }

        console.log(`Frosti: Generated new sw with revision ${revision}`);

        sw = data.split('__CACHE_TAG__').join(revision);
        fs.writeFile(dest, sw, 'utf8', (writeError) => {
          if (writeError) return console.log(writeError);
          return console.log(`Frosti: Updated service worker in ${dest}`);
        });
      }
    });
  }
};

export default generateSW;

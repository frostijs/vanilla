/* eslint-disable no-console */
const fs = require('fs-extra');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '../../');

fs.copy(`${ROOT_DIR}public`, `${ROOT_DIR}.dist`)
  .then(() => {
    console.log('copied', `${ROOT_DIR}public`, 'to', `${ROOT_DIR}.dist`);
  })
  .catch((err) => {
    console.error('doh', err);
  });

fs.copy(`${ROOT_DIR}src/template.html`, `${ROOT_DIR}functions/.dist/template.html`)
  .then(() => {
    console.log(
      'copied',
      `${ROOT_DIR}src/template.html`,
      'to',
      `${ROOT_DIR}functions/.dist/template.html`
    );
  })
  .catch((err) => {
    console.error('doh', err);
  });

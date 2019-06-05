// require.extensions['.css'] = () => {};
// require.extensions['.scss'] = () => {};
// require.extensions['.styl'] = () => {};

const path = require('path');
const { babel } = require('@frosti/config');

const ROOT = path.join(__dirname, './');

const cfg = babel(ROOT, {
  library: false
});

// console.log('BABEL', cfg.plugins);
module.exports = cfg;

/* eslint-disable no-console */
const depcheck = require('depcheck');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '../../');

const options = {
  ignoreBinPackage: false,
  skipMissing: false,
  ignoreDirs: ['.dist'],
  ignoreMatches: [
    // custom mapping
    '@config/*',
    '@containers/*',
    '@components/*',
    '@src/*',
    // build tools
    '@babel/*',
    'babel-*',
    'eslint-*',
    // node-modules
    '@ind.ie/nodecert',
    'husky',
    'identity-obj-proxy',
    'jest',
    'npm-run-all',
    'prettier',
    'pretty-quick'
  ],
  specials: [
    // the target special parsers
    depcheck.special.babel,
    depcheck.special.eslint
  ]
};

depcheck(ROOT_DIR, options, (unused) => {
  let errors = false;

  if (unused.missing.length > 0) {
    console.log('\n');
    console.log('--------------------');
    console.log('Missing Dependencies');
    console.log('--------------------');
    unused.missing.map((dependency) => {
      console.log(`* ${dependency}`);
    });
    errors = true;
  }

  if (unused.dependencies.length > 0) {
    console.log('\n');
    console.log('-------------------');
    console.log('Unused Dependencies');
    console.log('-------------------');
    unused.dependencies.map((dependency) => {
      console.log(`* ${dependency}`);
    });
    errors = true;
  }

  if (unused.devDependencies.length > 0) {
    console.log('\n');
    console.log('-----------------------');
    console.log('Unused Dev Dependencies');
    console.log('-----------------------');
    unused.devDependencies.map((dependency) => {
      console.log(`* ${dependency}`);
    });
    errors = true;
  }

  process.on('SIGTERM', () => {
    console.log('Doh!');
  });

  if (!errors) {
    console.log('----------------------------');
    console.log('All your packages look okay!');
    console.log('----------------------------');
  } else {
    console.error('There was an uncaught error');
    process.exit(1); // mandatory (as per the Node docs)
  }

  console.log('\n');
});

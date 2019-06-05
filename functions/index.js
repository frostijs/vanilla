/* eslint-disable no-console */

process.env.HOST = 'firebase';

const functions = require('firebase-functions');
const ssr = require('./.dist/ssr');

module.exports.ssr = functions.https.onRequest(ssr);

/* eslint-disable max-len, no-console */

import favicons from 'favicons'; // eslint-disable-line
import fs from 'fs';
import path from 'path';
import config from '../../config/app';

const ROOT_DIR = path.join(__dirname, '../../');

const source = `${ROOT_DIR}public/icon.png`;

const configuration = {
  path: '/icons/', // Path for overriding default icons path. `string`
  appName: config.appName, // Your application's name. `string`
  appShortName: config.appShortName, // Your application's short_name. `string`. Optional. If not set, appName will be used
  appDescription: config.appDescription, // Your application's description. `string`
  lang: config.lang, // Primary language for name and short_name
  background: '#fff', // Background colour for flattened icons. `string`
  theme_color: '#fff', // Theme color user for example in Android's task switcher. `string`
  appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
  display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  scope: '/', // set of URLs that the browser considers within your app
  start_url: '/', // Start URL when launching the application from a device. `string`
  version: '1.0', // Your application's version string. `string`
  logging: false, // Print logs to console? `boolean`
  pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
  loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
    //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
    //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
    //
    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    coast: true, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    yandex: true // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
  }
};

const DIST_DIR = `${ROOT_DIR}.dist/`;
const ICON_DIR = `${DIST_DIR}/icons/`;

const generateIcons = () => {
  favicons(source, configuration, (error, response) => {
    if (error) {
      console.log(error.message); // Error description e.g. "An unknown error has occurred"
      return;
    }

    if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR);

    fs.unlink(ICON_DIR, () => {
      if (!fs.existsSync(ICON_DIR)) fs.mkdirSync(ICON_DIR);

      response.images.map((file) => {
        if (file.name) {
          fs.writeFile(`${ICON_DIR}${file.name}`, file.contents, (err) => {
            if (err) {
              console.log('COULD NOT SAVE', `${ICON_DIR}${file.name}`, err);
              return false;
            }
            return true;
          });
        }
      });

      response.files.map((file) => {
        if (file.name) {
          fs.writeFile(`${ICON_DIR}${file.name}`, file.contents, (err) => {
            if (err) {
              console.log('COULD NOT SAVE', `${ICON_DIR}${file.name}`, err);
              return false;
            }
            return true;
          });
        }
      });

      response.html.map((file) => {
        if (file.name) {
          fs.writeFile(`${ICON_DIR}${file.name}`, file.contents, (err) => {
            if (err) {
              console.log('COULD NOT SAVE', `${ICON_DIR}${file.name}`, err);
              return false;
            }
            return true;
          });
        }
      });
    });
  });
};

export default generateIcons;

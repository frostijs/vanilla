import fs from 'fs';
import path from 'path';
import config from '@config/app';
// import Menu from '@components/Menu/Menu';

const ENABLE_SW = process.env.NODE_ENV === 'production' || process.env.ENABLE_SW;

const renderTemplate = (which) => {
  const file = path.resolve(which);

  return new Promise((resolve, reject) => {
    // LOAD HTML TEMPLATE FROM DISK
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err); // eslint-disable-line
        return reject(`Error loading ${file}`); // eslint-disable-line
      }

      // RENDER REACT CODE
      let content = data.replace(
        '<!-- SSR_CONTENT -->',
        `<div id="root">
        </div>`
      );

      content = content.split('className').join('class');

      // const helmet = Helmet.renderStatic();

      // SET HTML ATTRS
      content = content.replace('<html>', '<html lang="en">');

      // SET BODY ATTRS
      content = content.replace('<body>', '<body data-server-rendered="true">');

      // SET HEAD DATA
      content = content.replace(
        '<!-- SSR_HEAD -->',
        `<head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="${config.appDescriptions}" />

          <title>${config.appName}</title>

          <meta name="theme-color" content="#e3c9de" />
          <link rel="manifest" href="/icons/manifest.json" />
          <link rel="preload" as="script" href="/app.js" />
          <link rel="preload" as="style" href="/app.css" />

          <link rel="stylesheet" href="/app.css" />
          <link rel="icon" type="image/png" href="/icons/favicon-32x32.png" />
        </head>`
      );

      // SETUP SW
      if (ENABLE_SW) {
        console.log('Injecting Service Worker'); // eslint-disable-line
        content = content.replace(
          '<!-- SERVICE_WORKER -->',
          `<script>
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/service-worker.js').then((registration) => {
                this.serviceWorkerRegistration = registration;
              });
            }
          </script>`
        );
      }

      return resolve(content);
    });
  });
};

export default renderTemplate;

# Frosti Boilerplate (React)

## Why?

Use this is a starting point for your next project. Easier than starting from scratch, more configurable than `create-react-app`.

## Features

You will get all of these things out of the box:

- Progressive Web App (PWA)
- Express Powered Server Side Rendering (SSR)
  - Including HTTP/2 & Server Push (Firebase only for now)
- Service workers
- SSL (even on localhost!)
- Unit testing with Jest
- Easy deployment to:
  - Firebase
  - Heroku (Doesn't yet support HTTP/2 or server push)
  - Docker
  - Any static server

---

## Getting Started

### Install SSL Certs

You should only need to do this once, and will prevent self-sign certificate error on localhost.

```
$ npm run ssl
```

### Start Dev Server

```
$ npm run dev
```

### Start Prod Server

```
$ npm run build
$ npm start
```

---

## Features

### JS

We are using React 16 on both the client and server side. JavaScript is being processed by babel, so you are free to use the latest ES code.

### CSS

CSS is built with postcss, and in pre-configured with [preset-env](https://preset-env.cssdb.org/) support so you are free to use the latest CSS features.

Shared styles live in `src/styles`, and are automatically bundled & served as `app.css`. Inividual components and containers may also import their own styles.

### SSR

We are using Express 4 server to support server-side rendering (SSR) on the back-end.

### Alias'

Alias' have been setup for common directories, to save keystrokes and make it easier to import files across the app. So instead relative paths like `import MyComponent from '../../../components/MyComponent'` you can simply use `import MyComponent from '@components/MyComponent'` and babel will take care of the correct linking. The following alias' are currently enabled:

```
[
  '@src': './src',
  '@containers': './src/containers',
  '@styles': './src/css/',
  '@css': './src/css/',
  '@config': './config',
  '@dist': './.dist',
  '@lib': './.lib',
  '@public': './public',
  '@test': './test'
]
```

## Application Structure

### Entry

The app has separate entries for client and server. The initial render will be done on the server side, and the it will be "rehydrated" in the browser and the client will take over any later updates.

##### Client

The main entry file for the client is `src/Client.jsx`. This is bundled by Rollup and served in the browser as `app.js`.

##### Server

The main entry file for the server is `src/Server.jsx`. This is imported by `src/Express.js` and used to do the initial render on the server.

### Routes

Routes are defined for both client and server in `src/Routes.js`.

### HTML Template

We have a very basic html template setup in `src/template.html` which Express server will use to render the initial page view. There are two blocks which should not be modified:

`<!-- SSR_HEAD -->` which is where our `<head>` data will be injected, and `<!-- SSR_CONTENT -->` which is where the Express will inject it's server rendered content.

##### Head Data

We are using [React Helmet](https://github.com/nfl/react-helmet) to manage our `<head>` and maintain consistency between client and server. All of our head data is managed in `src/Head.js`.

## Jenkins setup

- give "jenkins-pull" user read only access to your repo
- use SSH git clone url from stash
- use the preconfigured jenkins-pull ssh credential in ddapps.xyz jenkins

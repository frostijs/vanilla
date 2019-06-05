// <ServerApp url={req.url} context={context} />

import { createBrowserHistory } from 'history';
import pathToRegexp from 'path-to-regexp';

// const pathToRegexp = require('path-to-regexp');

const history = createBrowserHistory();

const Link = (to, text, className) => {
  const el = document.createElement('a');
  el.setAttribute('class', className);
  el.innerHTML = text;

  el.addEventListener('click', (e) => {
    e.preventDefault();
    history.push(to);
  });

  return el;
};

class Router {
  constructor(initialRoutes) {
    this.routes = [];

    this.location = {};
    this.onRender = null;

    if (initialRoutes.length > 0) {
      this.addRoute(initialRoutes);
      // this.matchRoute();
    }

    this.parse();

    this.unlisten = history.listen((location, action) => {
      this.OnNavigate(location, action);
    });
  }

  OnNavigate() {
    this.matchRoute();
  }

  onMatch(route) {
    const loc = this.location;
    if (!this.location.initialMatch) {
      console.log('Initial route', route);
      this.location.initialMatch = true;
      this.location.previous = this.location.current;
      if (typeof this.onRender === 'function') this.onRender(route.component);
    } else if (loc.previous && loc.current.path !== loc.previous.path) {
      this.location.previous = this.location.current;
      if (typeof this.onRender === 'function') this.onRender(route.component);
    }
  }

  // ADD A NEW ROUTE
  addRoute(route) {
    let match = false;

    if (route.path) {
      // ENSURE ROUTE DOESN'T ALREADY EXIST
      this.routes.map((item) => {
        if (item.path === route.path) {
          console.warn('Warning, the route you are trying to add already exists', route);
          match = true;
        }
      });
      if (!match) {
        if (route.path === '/*') route.path = '(.*)'; // eslint-disable-line
        this.routes.push(route);
        setTimeout(() => {
          this.matchRoute();
        }, 1200);
      }
    } else {
      route.map((item) => {
        this.addRoute(item);
      });
    }
  }

  render(cb) {
    this.onRender = cb;
  }

  // SEE IF CURRENT PATH MATCHES ANY ROUTES
  matchRoute() {
    return new Promise((resolve, reject) => {
      if (this.routes.length > 0) {
        const matches = [];
        const loc = history.location;
        let matchedRoute = false;

        this.routes.map((route, num) => {
          let last = false;
          if (num + 1 === this.routes.length) last = true;

          if (route.path.charAt(0) !== '/') route.path = `/${route.path}`;
          route.match = []; // eslint-disable-line

          const { path } = route;
          const result = pathToRegexp(path, [], {
            strict: true
          }).exec(loc.pathname);

          if (result) {
            matches.push({
              ...route,
              result,
              last
            });
          }
        });

        if (matches.length > 1) {
          matches.map((match) => {
            if (match) {
              if (!match.last) {
                matchedRoute = match;
              }
            }
          });
        } else if (matches.length === 1) {
          matchedRoute = matches[0];
        }

        if (matchedRoute) {
          this.location.current = matchedRoute;
          this.onMatch(matchedRoute);
          resolve(matchedRoute);
        } else {
          reject('No route matched');
          console.log('PAGE NOT FOUND');
        }
      } else {
        reject('No routes defined');
      }
    });
  }

  // PARSE CURRENT LOCATION
  parse() {
    const loc = history.location;
    const params = [];
    const query = [];

    // GET PATH CHUNKS
    loc.pathname.split('/').map((part) => {
      if (part !== '') params.push(part);
    });

    // GET QUERY PARAMS
    loc.search
      .substr(1)
      .replace('?', '')
      .split('&')
      .map((item) => {
        const param = item.split('=');
        const key = param[0];
        const value = param[1];
        query[key] = value;
      });

    this.location = {
      previous: null,
      current: null,
      path: loc.pathname,
      hash: loc.hash,
      search: loc.search,
      params,
      query,
      raw: loc
    };
  }
}

export default Router;
export { Link };

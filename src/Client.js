import Menu from '@components/Menu/Menu';

import './css/app.scss';
import Frosti, { Div, Section } from '../lib/util';
import Router from '../lib/router';

const TestPage = {
  render() {
    return Section([
      Menu.render(),
      Div('Test Page', {
        className: 'container with-menu'
      })
    ]);
  }
};

const HomePage = {
  render() {
    return Section([
      Menu.render(),
      Div('Home Page', {
        className: 'container with-menu'
      })
    ]);
  }
};

console.log(TestPage);

const router = new Router([
  {
    path: '/',
    exact: true,
    component: HomePage.render(),
    name: 'Index'
  },
  {
    path: '/test',
    exact: true,
    component: TestPage.render(),
    name: 'Test'
  },
  {
    path: '/foo/bar',
    exact: true,
    component: 'Foobar',
    name: 'Foobar'
  },
  {
    path: '/shop/:cat1/:cat2?',
    exact: true,
    component: 'Shopping',
    name: 'Shopping'
  },
  {
    path: '/*',
    component: 'Error404',
    name: 'Error404'
  }
]);

router.render((content) => {
  Frosti.render(content, document.getElementById('root'));
});

// Frosti.hydrate(Menu.render(), document.getElementById('root'));

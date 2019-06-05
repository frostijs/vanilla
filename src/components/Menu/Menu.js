import './Menu.css';

import { Link } from '../../../lib/router';
import { Section } from '../../../lib/util';

const Menu = {
  render() {
    return Section([Link('/', 'Home', 'menu-item'), Link('/test', 'Test Page', 'menu-item')], {
      className: 'menu-primary'
    });
  }
};

export default Menu;

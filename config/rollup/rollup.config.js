import path from 'path';
import { rollup } from '@frosti/config';
import CONFIG from '../app';

const ROOT = path.join(__dirname, '../../');

export default rollup.client({
  CONFIG,
  ROOT
});

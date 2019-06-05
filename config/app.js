import path from 'path';

export default {
  appName: 'Frosti Boilerplate',
  appShortName: 'Frosti',
  appDescription: 'Frosti Boilerplate',
  lang: 'en-US',
  host: 'local',
  dir: {
    public: path.join(__dirname, '../public'),
    dist: path.join(__dirname, '../.dist'),
    functions: path.join(__dirname, '../.functions'),
    src: path.join(__dirname, '../src'),
    root: path.join(__dirname, '../')
  }
};

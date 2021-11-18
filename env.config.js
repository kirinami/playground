const fs = require('fs-extra');

const NODE_ENV = process.env.NODE_ENV || 'development';

[`.env.${NODE_ENV}.local`, NODE_ENV !== 'test' && '.env.local', `.env.${NODE_ENV}`, '.env']
  .filter(Boolean)
  .forEach((dotenvFile) => {
    if (!fs.existsSync(dotenvFile)) return;
    require('dotenv-expand')(require('dotenv').config({
      path: dotenvFile,
    }));
  });

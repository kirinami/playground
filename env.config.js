const fs = require('fs-extra');
const dotenv = require('dotenv');

const NODE_ENV = process.env.NODE_ENV || 'development';

[`.env.${NODE_ENV}.local`, '.env.local', `.env.${NODE_ENV}`, '.env'].forEach((dotenvFile) => {
  if (!fs.existsSync(dotenvFile)) return;

  const env = dotenv.parse(fs.readFileSync(dotenvFile));

  for (const key in env) {
    process.env[key] = process.env[key] || env[key];
  }
});

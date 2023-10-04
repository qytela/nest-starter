const fs = require('fs');
const crypto = require('crypto');

const timestamps = () => {
  const now = new Date();
  const time = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now
    .getHours()
    .toString()
    .padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;

  return time;
};

const generateAppKey = (args) => {
  const stringLength = args.L;
  const generateRandomKey = crypto.randomBytes(stringLength).toString('hex');

  const envFile = fs.readFileSync(__dirname + '/../.env', 'utf-8');
  const envEdit = envFile.replace(
    /APP_KEY=.*/g,
    `APP_KEY=nest:${timestamps()}:${generateRandomKey}`,
  );

  fs.writeFileSync(__dirname + '/../.env', envEdit, 'utf-8');

  return generateRandomKey;
};

module.exports = generateAppKey;

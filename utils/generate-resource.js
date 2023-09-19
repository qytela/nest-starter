const fs = require('fs');
const Mustache = require('mustache');

const generateResource = (args) => {
  const { name, path } = args;

  const splitName = name.split('-');
  const className = splitName
    .map((v, k) => `${v.charAt(0).toUpperCase()}${v.slice(1)}`)
    .join('');

  const data = { name, className };

  const templateResource = fs.readFileSync(
    __dirname + '/templates/resource.mustache',
    'utf8',
  );
  const templateResourceCollection = fs.readFileSync(
    __dirname + '/templates/resource-collection.mustache',
    'utf8',
  );
  const mustacheResource = Mustache.render(templateResource, data);
  const mustacheResourceCollection = Mustache.render(
    templateResourceCollection,
    data,
  );

  try {
    const dirExists = fs.existsSync(`./${path}`);
    if (!dirExists) {
      fs.mkdirSync(`./${path}`);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  fs.writeFileSync(`./${path}/${name}.resource.ts`, mustacheResource);
  fs.writeFileSync(
    `./${path}/${name}.collection.ts`,
    mustacheResourceCollection,
  );
};

module.exports = generateResource;

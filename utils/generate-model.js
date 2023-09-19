const fs = require('fs');
const Mustache = require('mustache');

const generateModel = (args) => {
  const { name, attributes } = args;

  const splitName = name.split('-');
  const className = splitName
    .map((v, k) => `${v.charAt(0).toUpperCase()}${v.slice(1)}`)
    .join('');

  const attributeArray = attributes.split(',');

  const data = {
    modelName: className,
    attributes: attributeArray.map((attribute, key) => {
      const isLast = key === attributeArray.length - 1;
      const [fieldName, fieldType] = attribute
        .replace(/text/g, 'string')
        .replace(/int/g, 'number')
        .split(':');
      return { fieldName, fieldType, fieldBreak: !isLast };
    }),
  };

  const template = fs.readFileSync(
    __dirname + '/templates/model.mustache',
    'utf8',
  );
  const mustache = Mustache.render(template, data);

  fs.writeFileSync(`./src/models/${name}.model.ts`, mustache);
};

module.exports = generateModel;

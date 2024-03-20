const fs = require('fs');
const Mustache = require('mustache');

const generateValidation = (args) => {
  const { name, class: className } = args;

  const template = fs.readFileSync(
    __dirname + '/templates/validation.mustache',
    'utf8',
  );
  const mustache = Mustache.render(template, { name, className });

  fs.writeFileSync(`./src/validators/${className}.ts`, mustache);
};

module.exports = generateValidation;

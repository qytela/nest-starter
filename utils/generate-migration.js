const fs = require('fs');
const Mustache = require('mustache');

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

const generateMigration = (args) => {
  const { name, attributes } = args;

  const className = name.replace(/-/g, '_');

  const attributeArray = attributes.split(',');

  const data = {
    modelName: className,
    attributes: attributeArray.map((attribute, key) => {
      const [fieldName, fieldType, allowNull] = attribute.split(':');
      return {
        fieldName,
        fieldType: `Sequelize.${fieldType.toUpperCase()}`,
        allowNull: allowNull === 'null' ?? false,
      };
    }),
  };

  const template = fs.readFileSync(
    __dirname + '/templates/migration.mustache',
    'utf8',
  );
  const mustache = Mustache.render(template, data);

  fs.writeFileSync(`./migrations/${timestamps()}-create-${name}.js`, mustache);
};

module.exports = generateMigration;

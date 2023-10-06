const fs = require('fs');
const { Command } = require('commander');

const generateAppKey = require('./utils/generate-appkey');
const generateModel = require('./utils/generate-model');
const generateMigration = require('./utils/generate-migration');
const generateResource = require('./utils/generate-resource');

const program = new Command();

const importChalk = async () => {
  const { default: chalk } = await import('chalk');
  return chalk;
};

program
  .command('generate:key')
  .alias('gk')
  .description('Generate app key')
  .option('--length, -l <length>', 'String length', 16)
  .action(async (_, { _optionValues: args }) => {
    const chalk = await importChalk();

    const key = generateAppKey(args);

    console.log('String Length: ' + chalk.green(args.L));
    console.log('Secret Key: ' + chalk.green(key));
    console.log(chalk.green('App Key Generated'));
  });

program
  .command('generate:model')
  .alias('gmo')
  .description('Generate new model')
  .option('--name <name>', 'Model name')
  .option('--attributes <attributes>', 'Model attributes')
  .option('--migration, -m', 'Create with new migration', false)
  .action(async (_, { _optionValues: args }) => {
    const chalk = await importChalk();

    if (!args.name) {
      return console.log(chalk.red('--name required'));
    }
    if (!args.attributes) {
      return console.log(chalk.red('--attributes required'));
    }

    try {
      const fileExists = fs.existsSync(
        `src/models/${args.name}.model.ts`,
        fs.constants.F_OK,
      );
      if (fileExists) {
        return console.log(chalk.red('Model already exists'));
      }
    } catch (error) {
      return console.log(chalk.red(`Error: $${error}`));
    }

    generateModel(args);
    console.log(chalk.green('Model generated success'));

    if (args.M) {
      generateMigration(args);
      console.log(chalk.green('Migration generated success'));
    }
  });

program
  .command('generate:migration')
  .alias('gmi')
  .description('Generate new migration')
  .option('--name <name>', 'Table name')
  .option('--attributes <attributes>', 'Table attributes')
  .action(async (_, { _optionValues: args }) => {
    const chalk = await importChalk();

    if (!args.name) {
      return console.log(chalk.red('--name required'));
    }
    if (!args.attributes) {
      return console.log(chalk.red('--attributes required'));
    }

    generateMigration(args);
    console.log(chalk.green('Migration generated success'));
  });

program
  .command('generate:resource')
  .alias('gr')
  .description('Generate new resource and collection')
  .option('--name <name>', 'Resource name')
  .option('--path <path>', 'Resource path')
  .action(async (_, { _optionValues: args }) => {
    const chalk = await importChalk();

    if (!args.name) {
      return console.log(chalk.red('--name required'));
    }
    if (!args.path) {
      return console.log(chalk.red('--path required'));
    }

    generateResource(args);
    console.log(chalk.green('Resource generated success'));
  });

program.parse(process.argv);

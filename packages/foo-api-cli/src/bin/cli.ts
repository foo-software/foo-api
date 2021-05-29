#!/usr/bin/env node
import meow from 'meow';
import displayHelp from '../helpers/displayHelp';
import displayVersion from '../helpers/displayVersion';
import importPagesFromFile from '../helpers/importPagesFromFile';
import ResourceEnum from '../enums/Resource';

const {
  flags,
  input: [command, ...resources],
} = meow();

enum Command {
  IMPORT = 'import',
}

if (flags.h || flags.help) {
  displayHelp();
  process.exit();
}

if (flags.v || flags.version) {
  displayVersion();
  process.exit();
}

if (!command) {
  throw Error('invalid command');
}

if (!resources.length) {
  throw Error('invalid resource');
}

if (command === Command.IMPORT) {
  if (resources[0] === ResourceEnum.PAGES) {
    if (typeof flags.filePath !== 'string') {
      throw Error('"filePath" flag is invalid or missing');
    }
    if (typeof process.env.FOO_API_TOKEN !== 'string') {
      throw Error('"FOO_API_TOKEN" environment variable is invalid or missing');
    }
    importPagesFromFile({
      apiToken: process.env.FOO_API_TOKEN,
      apiUrl: process.env.FOO_API_URL,
      failOnError: flags.failOnError,
      filePath: flags.filePath,
      filePathOutput: flags.filePathOutput,
      silent: flags.silent,
    });
  } else {
    displayHelp();
  }
} else {
  displayHelp();
}

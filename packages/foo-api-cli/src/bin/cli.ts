import meow from 'meow';
import ResourceEnum from '../enums/Resource';
import { displayHelp } from '../helpers/displayHelp';
import { displayVersion } from '../helpers/displayVersion';

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
    console.log('pages');
  } else {
    displayHelp();
  }
} else {
  displayHelp();
}

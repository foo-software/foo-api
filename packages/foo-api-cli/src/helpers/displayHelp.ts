import { LATEST_API_DOCS_URL } from '../constants';

const displayHelp = () =>
  console.log(`
Usage:
    foo-api [command] [resource] [options]

See documentation for complete details:
    ${LATEST_API_DOCS_URL}
`);

export default displayHelp;

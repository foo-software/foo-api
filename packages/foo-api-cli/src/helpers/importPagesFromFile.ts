import fs from 'fs';
import path from 'path';
import { ApiClient } from '@foo-software/foo-api-client';

export default async ({
  apiToken,
  apiUrl,
  failOnError,
  filePath,
  filePathOutput,
  silent,
}: {
  apiToken: string;
  apiUrl?: string;
  failOnError?: boolean | unknown;
  filePath: string;
  filePathOutput?: string | unknown;
  silent?: boolean | unknown;
}) => {
  const fullFilePath = path.resolve(filePath);
  const content = fs.readFileSync(fullFilePath, { encoding: 'utf8' });
  const rows = content.split('\n');

  const apiClient = new ApiClient({
    apiToken,
    apiUrl,
  });

  const completed = [];
  const errors = [];

  // for each row of the input file, extract the page data
  // and create
  for (const row of rows) {
    const [name, url] = row.split(',');
    const { data, error } = await apiClient.createPage({
      payload: {
        name,
        url,
      },
    });

    if (error) {
      if (failOnError) {
        throw Error(error);
      }
      errors.push({
        error,
        name,
        url,
      });
    }

    if (data?.id && !silent) {
      console.log(`[✔️] ${url}`);
      completed.push({
        id: data.id,
        name,
        url,
      });
    }
  }

  // write the results to the output file if specified
  if (completed.length && typeof filePathOutput === 'string') {
    const output = completed
      .map((row) => `${row.id},${row.name},${row.url}`)
      .join('\n');
    const fullFilePathOutput = path.resolve(filePathOutput);
    fs.writeFileSync(fullFilePathOutput, output);
  }

  if (!silent) {
    console.log('[✔️] import complete.');
  }

  if (completed.length && !silent) {
    console.log('[✔️] completed:', completed);
  }

  if (errors.length && !silent) {
    console.log('[x] errors:', errors);
  }
};

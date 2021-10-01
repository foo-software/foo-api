#!/usr/bin/env node
import fs from 'fs';
import meow from 'meow';
import path from 'path';
import zlib from 'zlib';
import { compress as brotliCompress } from 'brotli';
import { promisify } from 'util';

interface BrotliSettingsInterface {
  extension: string;
  skipLarger: boolean;
  mode: 0 | 1 | 2;
  quality: 0 | 1 | 2 | 10 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11;
  lgwin: number;
}

// took this from here
// https://itnext.io/increase-node-js-server-performance-by-serving-smaller-faster-pre-compressed-brotli-gzipped-499c8da37f6c
// https://quixdb.github.io/squash-benchmark/#results-table
const brotliSettings: BrotliSettingsInterface = {
  extension: 'br',
  skipLarger: true,
  mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
  quality: 10, // 0 - 11,
  lgwin: 12, // default
};

const cli = meow();
const { directory } = cli.flags;

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// returns an array of files within a directory and all subdirectories
const getFiles = async ({
  directory,
}: {
  directory: string;
}): Promise<string[]> => {
  console.log(`getting files for directory: ${directory}`);

  const contents = await readdir(directory);
  const directories = [];
  const files = [];

  // iterate over contents of the directory
  for (const item of contents) {
    const itemPath = path.join(directory, item);

    // get the info for a given directory item
    const info = await stat(itemPath);

    // if the item is a directory, push it to an array we use later
    // and continue to the next tick of the loop
    if (info.isDirectory()) {
      directories.push(itemPath);

      continue;
    } else if (
      item.endsWith('.css') ||
      item.endsWith('.html') ||
      item.endsWith('.js')
    ) {
      files.push(itemPath);
    }
  }

  // if no directories then simply return all files
  if (!directories.length) {
    return files;
  } else {
    console.log(`total subdirectories found: ${directories.length}`);

    // iterate over directories and get all files within
    for (const directory of directories) {
      const directoryFiles = await getFiles({ directory });

      // add all files from subdirectories to our array
      files.push(...directoryFiles);
    }

    return files;
  }
};

// returns a promise to compress a file.
export const compressFile = (file: string): Promise<void> =>
  new Promise((resolve, reject) => {
    // brotli
    const brotiliFormattedContent = brotliCompress(
      fs.readFileSync(file),
      brotliSettings
    );
    fs.writeFileSync(`${file}.br`, brotiliFormattedContent);

    // gzip
    const gzipFormattedContent = fs.createReadStream(file);
    const writeStream = fs.createWriteStream(`${file}.gz`);
    const zip = zlib.createGzip();

    // collect errors
    const errors: string[] = [];

    gzipFormattedContent
      .pipe(zip)
      .on('error', (error) => errors.push(error.message))
      .pipe(writeStream)
      .on('error', (error) => errors.push(error.message));

    // if we have errors reject and the caller can decide how to handle.
    if (!errors.length) {
      console.log(`complete: ${file}`);
      resolve();
    } else {
      const errorMessage = errors.join(',');
      console.log(`error: ${file}`, errorMessage);
      reject(errorMessage);
    }
  });

// compress a single file or directory of files (handles subdirectories)
const compressFiles = async () => {
  console.log(`options`, {
    directory,
  });

  if (typeof directory !== 'string') {
    throw Error('no input specified');
  }

  const resolvedDirectoryPath = path.resolve(directory);
  const files = await getFiles({ directory: resolvedDirectoryPath });

  // synchronously compress each file. doing this concurrently could become a
  // problem for machine resources.
  for (const file of files) {
    await compressFile(file);
  }
};

compressFiles();

#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressFile = void 0;
const fs_1 = __importDefault(require("fs"));
const meow_1 = __importDefault(require("meow"));
const path_1 = __importDefault(require("path"));
const zlib_1 = __importDefault(require("zlib"));
const brotli_1 = require("brotli");
const util_1 = require("util");
// took this from here
// https://itnext.io/increase-node-js-server-performance-by-serving-smaller-faster-pre-compressed-brotli-gzipped-499c8da37f6c
// https://quixdb.github.io/squash-benchmark/#results-table
const brotliSettings = {
    extension: 'br',
    skipLarger: true,
    mode: 1,
    quality: 10,
    lgwin: 12, // default
};
const cli = (0, meow_1.default)();
const { directory } = cli.flags;
const readdir = (0, util_1.promisify)(fs_1.default.readdir);
const stat = (0, util_1.promisify)(fs_1.default.stat);
// returns an array of files within a directory and all subdirectories
const getFiles = ({ directory, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`getting files for directory: ${directory}`);
    const contents = yield readdir(directory);
    const directories = [];
    const files = [];
    // iterate over contents of the directory
    for (const item of contents) {
        const itemPath = path_1.default.join(directory, item);
        // get the info for a given directory item
        const info = yield stat(itemPath);
        // if the item is a directory, push it to an array we use later
        // and continue to the next tick of the loop
        if (info.isDirectory()) {
            directories.push(itemPath);
            continue;
        }
        else if (item.endsWith('.css') ||
            item.endsWith('.html') ||
            item.endsWith('.js')) {
            files.push(itemPath);
        }
    }
    // if no directories then simply return all files
    if (!directories.length) {
        return files;
    }
    else {
        console.log(`total subdirectories found: ${directories.length}`);
        // iterate over directories and get all files within
        for (const directory of directories) {
            const directoryFiles = yield getFiles({ directory });
            // add all files from subdirectories to our array
            files.push(...directoryFiles);
        }
        return files;
    }
});
// returns a promise to compress a file.
const compressFile = (file) => new Promise((resolve, reject) => {
    // brotli
    const brotiliFormattedContent = (0, brotli_1.compress)(fs_1.default.readFileSync(file), brotliSettings);
    fs_1.default.writeFileSync(`${file}.br`, brotiliFormattedContent);
    // gzip
    const gzipFormattedContent = fs_1.default.createReadStream(file);
    const writeStream = fs_1.default.createWriteStream(`${file}.gz`);
    const zip = zlib_1.default.createGzip();
    // collect errors
    const errors = [];
    gzipFormattedContent
        .pipe(zip)
        .on('error', (error) => errors.push(error.message))
        .pipe(writeStream)
        .on('error', (error) => errors.push(error.message));
    // if we have errors reject and the caller can decide how to handle.
    if (!errors.length) {
        console.log(`complete: ${file}`);
        resolve();
    }
    else {
        const errorMessage = errors.join(',');
        console.log(`error: ${file}`, errorMessage);
        reject(errorMessage);
    }
});
exports.compressFile = compressFile;
// compress a single file or directory of files (handles subdirectories)
const compressFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`options`, {
        directory,
    });
    if (typeof directory !== 'string') {
        throw Error('no input specified');
    }
    const resolvedDirectoryPath = path_1.default.resolve(directory);
    const files = yield getFiles({ directory: resolvedDirectoryPath });
    // synchronously compress each file. doing this concurrently could become a
    // problem for machine resources.
    for (const file of files) {
        yield (0, exports.compressFile)(file);
    }
});
compressFiles();
//# sourceMappingURL=compress-files.js.map
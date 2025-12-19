"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.push = exports.commit = exports.add = exports.checkout = exports.config = void 0;
const shell_1 = __importDefault(require("./shell"));
const { PERSONAL_ACCESS_TOKEN: TOKEN } = process.env;
const GIT_URL = `https://foo-software-bot:${TOKEN}@github.com/foo-software/foo-api`;
const config = () => {
    (0, shell_1.default)('git config --global user.email notifications@foo.software');
    (0, shell_1.default)('git config --global user.name Foo Bot');
};
exports.config = config;
const checkout = (branch = 'master') => {
    (0, shell_1.default)(`git remote set-url origin ${GIT_URL}`);
    // Ensure we are exactly at the remote head (no shallow/merge weirdness in CI)
    (0, shell_1.default)(`git fetch --tags --prune origin ${branch}`);
    (0, shell_1.default)(`git checkout ${branch}`);
    (0, shell_1.default)(`git reset --hard origin/${branch}`);
};
exports.checkout = checkout;
const add = () => {
    (0, shell_1.default)('git add .');
};
exports.add = add;
const commit = (message) => {
    (0, shell_1.default)(`git commit -am '${message} (skip ci)'`);
};
exports.commit = commit;
const push = () => {
    (0, shell_1.default)('git push');
};
exports.push = push;
//# sourceMappingURL=git.js.map
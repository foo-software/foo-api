"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
exports.default = (command) => {
    const result = shelljs_1.default.exec(command);
    const isGrep = command.includes('grep');
    const isGitCommit = command.includes('git commit');
    // for some reason grep commands can return exit code `123`
    // when nothing was returned (and everything is fine)
    if (!isGitCommit && result.code !== 0 && (!isGrep || result.code !== 123)) {
        throw Error(result.stderr);
    }
    return result.stdout;
};
//# sourceMappingURL=shell.js.map
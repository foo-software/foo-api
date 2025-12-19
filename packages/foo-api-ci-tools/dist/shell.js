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
    const isLernaPublish = command.includes('lerna publish');
    // for some reason grep commands can return exit code `123`
    // when nothing was returned (and everything is fine)
    if (!isGitCommit && result.code !== 0 && (!isGrep || result.code !== 123)) {
        throw Error(result.stderr);
    }
    // Lerna can sometimes exit 0 while still refusing to publish (e.g. EBEHIND).
    // Treat that as a hard failure so CI doesn't falsely report success.
    if (isLernaPublish && (result.stderr || '').includes('EBEHIND')) {
        throw Error(result.stderr);
    }
    return result.stdout;
};
//# sourceMappingURL=shell.js.map
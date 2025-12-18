"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = void 0;
const shell_1 = __importDefault(require("./shell"));
const publish = () => {
    (0, shell_1.default)(`npx lerna publish patch --yes --message 'chore: lerna publish (skip ci)'`);
};
exports.publish = publish;
//# sourceMappingURL=lerna.js.map
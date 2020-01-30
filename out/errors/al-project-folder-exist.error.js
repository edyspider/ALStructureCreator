"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ALProjectFolderExistError extends Error {
    constructor(message = 'AL project folder already exists') {
        super(message);
        this.name = 'ALProjectFolderExistError';
    }
}
exports.ALProjectFolderExistError = ALProjectFolderExistError;
//# sourceMappingURL=al-project-folder-exist.error.js.map
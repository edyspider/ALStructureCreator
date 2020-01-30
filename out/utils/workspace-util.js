"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkspaceFolder = (folders) => {
    if (!folders) {
        return '';
    }
    const folder = folders[0] || {};
    const uri = folder.uri;
    return uri.fsPath;
};
//# sourceMappingURL=workspace-util.js.map
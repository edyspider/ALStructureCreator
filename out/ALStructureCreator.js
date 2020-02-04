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
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const vscode = require("vscode");
const al_project_folder_exist_error_1 = require("./errors/al-project-folder-exist.error");
const FolderSettings_1 = require("./FolderSettings");
class ALStructureCreator {
    constructor(workspaceRoot, window) {
        this.workspaceRoot = workspaceRoot;
        this.window = window;
        this.objectFolder = ['App', 'Images', 'Logo', 'Permissions', 'Rules', 'Tests', 'Translations', 'WebServices'];
        this.appSubFolderNum = ['01_Table', '02_Page', '03_Report', '04_Codeunit', '05_Query', '06_XMLport', '07_Enum', '08_ControllAddin', '99_DotNet'];
        this.appSubFolderTxt = ['Table', 'Page', 'Report', 'Codeunit', 'Query', 'XMLport', 'Enum', 'ControllAddin', 'DotNet'];
        this.defaultPath = '';
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectFolder = vscode.workspace.getConfiguration().get('ALStructureCreator.ProjectFolderOption');
            const createInRoot = (projectFolder === "Root");
            if (!createInRoot) {
                // prompt for the name of the master AL folder, or the path to create the AL folder structure in
                const alfolder = yield this.prompt();
                if (!alfolder) {
                    return;
                }
                const absoluteALPath = this.toAbsolutePath(alfolder);
                try {
                    this.create(absoluteALPath, createInRoot);
                    this.window.showInformationMessage(`ALStructureCreator: successfully created`);
                }
                catch (err) {
                    // log?
                    if (err instanceof al_project_folder_exist_error_1.ALProjectFolderExistError) {
                        this.window.showErrorMessage(`ALStructureCreator: '${alfolder}' already exists`);
                    }
                    else {
                        this.window.showErrorMessage(`Error: ${err.message}`);
                    }
                }
            }
            else {
                try {
                    this.create("", createInRoot);
                    this.window.showInformationMessage(`ALStructureCreator: successfully created`);
                }
                catch (err) {
                    this.window.showErrorMessage(`Error: ${err.message}`);
                }
            }
        });
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            // this can be abstracted out as an argument for prompt
            const options = {
                ignoreFocusOut: true,
                //prompt: `AL folder name: 'some_al', or a relative path: 'src/state/project/some_al'`,
                prompt: `AL folder name: 'AlProject', or a relative path: 'AlProject'`,
                placeHolder: 'AlProject',
                validateInput: this.validate
            };
            return yield this.window.showInputBox(options);
        });
    }
    create(absoluteALFolderPath, createInRoot) {
        if (!createInRoot) {
            if (fs.existsSync(absoluteALFolderPath)) {
                const alfolder = path.basename(absoluteALFolderPath);
                const errorOnExistFolder = vscode.workspace.getConfiguration().get('ALStructureCreator.ErrorOnExistFolder');
                if (errorOnExistFolder === true) {
                    throw new al_project_folder_exist_error_1.ALProjectFolderExistError(`'${alfolder}' already exists`);
                }
            }
            else {
                // create the directory
                fs.mkdirSync(absoluteALFolderPath);
            }
        }
        else {
            absoluteALFolderPath = this.toAbsolutePath("");
        }
        try {
            //FolderSettings.
            this.objectFolder.forEach((folder) => {
                const foldername = `${folder}`;
                const fullpath = path.join(absoluteALFolderPath, foldername);
                // Create Files
                //fs.writeFileSync(fullpath, `/* ${filename} */`);
                fs.mkdirSync(fullpath);
                if (foldername === 'App') {
                    const createExtSubFolder = vscode.workspace.getConfiguration().get('ALStructureCreator.CreateExtObjFolder');
                    let fullSubPath = "";
                    switch (vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
                        case "Numbered": {
                            this.appSubFolderNum.forEach((subFile) => {
                                const subFolderName = `${subFile}`;
                                fullSubPath = path.join(fullpath, subFolderName);
                                fs.mkdirSync(fullSubPath);
                                switch (createExtSubFolder) {
                                    case 'Cust':
                                        fs.mkdirSync(fullSubPath + 'Cust');
                                        break;
                                    case 'Ext':
                                        fs.mkdirSync(fullSubPath + 'Ext');
                                        break;
                                    case 'Both':
                                        fs.mkdirSync(fullSubPath + 'Cust');
                                        fs.mkdirSync(fullSubPath + 'Ext');
                                        break;
                                }
                            });
                            break;
                        }
                        case "Named": {
                            this.appSubFolderTxt.forEach((subFile) => {
                                const subFolderName = `${subFile}`;
                                fullSubPath = path.join(fullpath, subFolderName);
                                fs.mkdirSync(fullSubPath);
                                switch (createExtSubFolder) {
                                    case 'Cust':
                                        fs.mkdirSync(fullSubPath + 'Cust');
                                        break;
                                    case 'Ext':
                                        fs.mkdirSync(fullSubPath + 'Ext');
                                        break;
                                    case 'Both':
                                        fs.mkdirSync(fullSubPath + 'Cust');
                                        fs.mkdirSync(fullSubPath + 'Ext');
                                        break;
                                }
                            });
                            break;
                        }
                        default: {
                            //statements; 
                            break;
                        }
                    }
                }
            });
        }
        catch (err) {
            // log other than console?
            console.log('Error', err.message);
            throw err;
        }
    }
    createSingleFolder(appObject) {
        const appFolder = this.toAbsolutePath(FolderSettings_1.FolderSettings.GetAppFolder());
        let appFullpath = '';
        if (!fs.existsSync(appFolder)) {
            fs.mkdirSync(appFolder);
        }
        switch (appObject) {
            case FolderSettings_1.FolderSettings.Table():
                appFullpath = path.join(appFolder, FolderSettings_1.FolderSettings.Table());
                fs.mkdirSync(appFullpath);
                break;
            case FolderSettings_1.FolderSettings.Page():
                appFullpath = path.join(appFolder, FolderSettings_1.FolderSettings.Page());
                fs.mkdirSync(appFullpath);
                break;
            case FolderSettings_1.FolderSettings.Report():
                appFullpath = path.join(appFolder, FolderSettings_1.FolderSettings.Report());
                fs.mkdirSync(appFullpath);
                break;
            case FolderSettings_1.FolderSettings.Codeunit():
                appFullpath = path.join(appFolder, FolderSettings_1.FolderSettings.Codeunit());
                fs.mkdirSync(appFullpath);
                break;
            case FolderSettings_1.FolderSettings.Query():
                appFullpath = path.join(appFolder, FolderSettings_1.FolderSettings.Query());
                fs.mkdirSync(appFullpath);
                break;
            case FolderSettings_1.FolderSettings.XMLport():
                appFullpath = path.join(appFolder, FolderSettings_1.FolderSettings.XMLport());
                fs.mkdirSync(appFullpath);
                break;
            case FolderSettings_1.FolderSettings.Enum():
                appFullpath = path.join(appFolder, FolderSettings_1.FolderSettings.Enum());
                fs.mkdirSync(appFullpath);
                break;
            case FolderSettings_1.FolderSettings.CtrlAddin():
                appFullpath = path.join(appFolder, FolderSettings_1.FolderSettings.CtrlAddin());
                fs.mkdirSync(appFullpath);
                break;
            case FolderSettings_1.FolderSettings.DotNet():
                appFullpath = path.join(appFolder, FolderSettings_1.FolderSettings.DotNet());
                fs.mkdirSync(appFullpath);
                break;
        }
    }
    validate(name) {
        if (!name) {
            return 'Name is required';
        }
        if (name.includes(' ')) {
            return 'Blank spaces are not allowed';
        }
        var regex = /^[A-Za-z0-9 ]+$/;
        var isValid = regex.test(name);
        if (!isValid) {
            return 'Special characters are not allowed';
        }
        // no errors
        return null;
    }
    toAbsolutePath(nameOrRelativePath) {
        // simple test for slashes in string
        if (/\/|\\/.test(nameOrRelativePath)) {
            return path.resolve(this.workspaceRoot, nameOrRelativePath);
        }
        // if it's just the name of the al, assume that it'll be in 'src/state/project/'
        return path.resolve(this.workspaceRoot, this.defaultPath, nameOrRelativePath);
    }
    dispose() {
        console.log('disposing...');
    }
}
exports.ALStructureCreator = ALStructureCreator;
//# sourceMappingURL=ALStructureCreator.js.map
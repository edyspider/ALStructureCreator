"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const vscode_1 = require("vscode");
const ALStructureCreator_1 = require("./ALStructureCreator");
const workspace_util_1 = require("./utils/workspace-util");
const FolderSettings_1 = require("./FolderSettings");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const workspaceRoot = workspace_util_1.getWorkspaceFolder(vscode_1.workspace.workspaceFolders);
    const generator = new ALStructureCreator_1.ALStructureCreator(workspaceRoot, vscode_1.window);
    let disposable = vscode.commands.registerCommand('alstructurecreator.createallstructure', () => {
        generator.execute();
    });
    let disposableTable = vscode.commands.registerCommand('alstructurecreator.createtablefolder', () => {
        generator.createFolder(FolderSettings_1.FolderSettings.Table());
    });
    let disposablePage = vscode.commands.registerCommand('alstructurecreator.createpagefolder', () => {
        generator.createFolder(FolderSettings_1.FolderSettings.Page());
    });
    let disposableReport = vscode.commands.registerCommand('alstructurecreator.createreportfolder', () => {
        generator.createFolder(FolderSettings_1.FolderSettings.Report());
    });
    let disposableCodeunit = vscode.commands.registerCommand('alstructurecreator.createcodeunitfolder', () => {
        generator.createFolder(FolderSettings_1.FolderSettings.Codeunit());
    });
    let disposableQuery = vscode.commands.registerCommand('alstructurecreator.createqueryfolder', () => {
        generator.createFolder(FolderSettings_1.FolderSettings.Query());
    });
    let disposableXMLport = vscode.commands.registerCommand('alstructurecreator.createxmlportfolder', () => {
        generator.createFolder(FolderSettings_1.FolderSettings.XMLport());
    });
    let disposableEnum = vscode.commands.registerCommand('alstructurecreator.createenumfolder', () => {
        generator.createFolder(FolderSettings_1.FolderSettings.Enum());
    });
    let disposableCtrlAddin = vscode.commands.registerCommand('alstructurecreator.createactrladdinfolder', () => {
        generator.createFolder(FolderSettings_1.FolderSettings.CtrlAddin());
    });
    let disposableDotNet = vscode.commands.registerCommand('alstructurecreator.createdotnetfolder', () => {
        generator.createFolder(FolderSettings_1.FolderSettings.DotNet());
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(disposableTable);
    context.subscriptions.push(disposablePage);
    context.subscriptions.push(disposableReport);
    context.subscriptions.push(disposableCodeunit);
    context.subscriptions.push(disposableQuery);
    context.subscriptions.push(disposableXMLport);
    context.subscriptions.push(disposableEnum);
    context.subscriptions.push(disposableCtrlAddin);
    context.subscriptions.push(disposableDotNet);
    context.subscriptions.push(generator);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
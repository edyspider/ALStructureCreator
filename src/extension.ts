// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { commands, workspace, window, ExtensionContext } from 'vscode';
import { ALStructureCreator } from './ALStructureCreator';
import { getWorkspaceFolder } from './utils/workspace-util';
import { FolderSettings } from './FolderSettings';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const workspaceRoot: string = getWorkspaceFolder(workspace.workspaceFolders);
	const generator = new ALStructureCreator(workspaceRoot, window);

	let disposable = vscode.commands.registerCommand('alstructurecreator.createallstructure', () => {
		generator.execute();
	});

	let disposableTable = vscode.commands.registerCommand('alstructurecreator.createtablefolder', () => {
		generator.createFolder(FolderSettings.TableFolder());
	});
	let disposablePage = vscode.commands.registerCommand('alstructurecreator.createpagefolder', () => {
		generator.createFolder(FolderSettings.PageFolder());
	});
	let disposableReport = vscode.commands.registerCommand('alstructurecreator.createreportfolder', () => {
		generator.createFolder(FolderSettings.ReportFolder());
	});
	let disposableCodeunit = vscode.commands.registerCommand('alstructurecreator.createcodeunitfolder', () => {
		generator.createFolder(FolderSettings.CodeunitFolder());
	});
	let disposableQuery = vscode.commands.registerCommand('alstructurecreator.createqueryfolder', () => {
		generator.createFolder(FolderSettings.QueryFolder());
	});
	let disposableXMLport = vscode.commands.registerCommand('alstructurecreator.createxmlportfolder', () => {
		generator.createFolder(FolderSettings.XMLportFolder());
	});
	let disposableEnum = vscode.commands.registerCommand('alstructurecreator.createenumfolder', () => {
		generator.createFolder(FolderSettings.EnumFolder());
	});
	let disposableCtrlAddin = vscode.commands.registerCommand('alstructurecreator.createactrladdinfolder', () => {
		generator.createFolder(FolderSettings.CtrlAddinFolder());
	});
	let disposableDotNet = vscode.commands.registerCommand('alstructurecreator.createdotnetfolder', () => {
		generator.createFolder(FolderSettings.DotNetFolder());
	});
	let disposableReOrganize = vscode.commands.registerCommand('alstructurecreator.reorganizeobjects', () => {
		generator.reorganizeAppObjects();
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
	context.subscriptions.push(disposableReOrganize);
	context.subscriptions.push(generator);
}

// this method is called when your extension is deactivated
export function deactivate() {}

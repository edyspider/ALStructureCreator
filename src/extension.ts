// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { commands, workspace, window, ExtensionContext } from 'vscode';
import { ALStructureCreator } from './ALStructureCreator';
import { getWorkspaceFolder } from './utils/workspace-util';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const workspaceRoot: string = getWorkspaceFolder(workspace.workspaceFolders);
	const generator = new ALStructureCreator(workspaceRoot, window);

	let disposable = vscode.commands.registerCommand('alstructurecreator.createallstructure', () => {
		generator.execute();
	});
	let disposableFolder = vscode.commands.registerCommand('alstructurecreator.createstructure', () => {
		generator.addNewFolder();
	});
	let disposableReOrganize = vscode.commands.registerCommand('alstructurecreator.reorganizefiles', () => {
		generator.reorganizeAppFiles();
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableFolder);
	context.subscriptions.push(disposableReOrganize);
	context.subscriptions.push(generator);
}

// this method is called when your extension is deactivated
export function deactivate() {}

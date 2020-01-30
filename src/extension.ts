// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { commands, workspace, window, ExtensionContext } from 'vscode';
import { ALStructureCreator } from './ALStructureCreator';
import { getWorkspaceFolder } from './utils/workspace-util';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "AL Folder Structure" is now active!');

	const workspaceRoot: string = getWorkspaceFolder(workspace.workspaceFolders);
	const generator = new ALStructureCreator(workspaceRoot, window);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('es.al.createstructure', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		//vscode.window.showInformationMessage('Create AL Folder Structure');
		generator.execute();
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(generator);
}

// this method is called when your extension is deactivated
export function deactivate() {}

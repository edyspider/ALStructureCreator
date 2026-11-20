import * as vscode from 'vscode';
import { ALStructureCreator } from './al-structure-creator';
import { getWorkspaceFolder } from './utils/workspace-util';

// Called the first time one of the extension's commands runs.
export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('alstructurecreator.createallstructure', () => createGenerator()?.execute()),
    vscode.commands.registerCommand('alstructurecreator.createstructure', () => createGenerator()?.addNewFolder()),
    vscode.commands.registerCommand('alstructurecreator.reorganizefiles', () => createGenerator()?.reorganizeAppFiles()),
  );
}

// Called when the extension is deactivated.
export function deactivate(): void {}

/**
 * Creates the generator for the first workspace folder at the moment the
 * command runs, or shows an error when no folder is open.
 */
function createGenerator(): ALStructureCreator | undefined {
  const workspaceRoot = getWorkspaceFolder(vscode.workspace.workspaceFolders);
  if (!workspaceRoot) {
    vscode.window.showErrorMessage('ALStructureCreator: open a folder or workspace first.');
    return undefined;
  }
  return new ALStructureCreator(workspaceRoot, vscode.window);
}

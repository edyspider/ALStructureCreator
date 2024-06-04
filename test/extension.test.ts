import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import { ALStructureCreator } from '../src/ALStructureCreator'; // Use named import
import { workspace, window } from 'vscode';
import { getWorkspaceFolder } from '../src/utils/workspace-util';

suite('ALStructureCreator Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  let workspaceRoot: string;
  let alStructureCreator: ALStructureCreator;
  var rootPath = 'ALStructureCreator.FolderStructure.structure';

  suiteSetup(() => {
    workspaceRoot = getWorkspaceFolder(workspace.workspaceFolders);
    alStructureCreator = new ALStructureCreator(workspaceRoot, window);
  });

  // Test for create folder structure (assuming this is part of `execute`)
  test('Execute function', async () => {
    await alStructureCreator.execute();

    // Verify that the folder structure was created
    const expectedFolder = path.join(workspaceRoot, 'path', 'to', 'expected', 'folder');
    const folderExists = await vscode.workspace.fs.stat(vscode.Uri.file(expectedFolder)).then(() => true, () => false);
    assert.strictEqual(folderExists, true, 'The folder structure should be created');
  });

  // Test for adding a new folder
  test('Add new folder', async () => {
    await alStructureCreator.createAllFolderStructure('NewFolderName',rootPath);

    // Verify that the new folder was created
    const newFolder = path.join(workspaceRoot, 'NewFolderName');
    const folderExists = await vscode.workspace.fs.stat(vscode.Uri.file(newFolder)).then(() => true, () => false);
    assert.strictEqual(folderExists, true, 'The new folder should be created');
  });

  // Test for reorganizing app files
  test('Reorganize app files', async () => {
    await alStructureCreator.reorganizeAppFiles();

    // Verify that files have been moved to the expected folders
    // This is an example, adjust the file paths and folder structure as needed
    const expectedFilePath = path.join(workspaceRoot, 'organized', 'path', 'to', 'file.al');
    const fileExists = await vscode.workspace.fs.stat(vscode.Uri.file(expectedFilePath)).then(() => true, () => false);
    assert.strictEqual(fileExists, true, 'The file should be moved to the correct folder');
  });
});

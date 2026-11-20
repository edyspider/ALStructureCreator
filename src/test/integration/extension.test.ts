import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

// These tests run inside a real VS Code window, opened on test-fixtures/workspace
// (see .vscode-test.mjs). Each test starts from an empty folder.

function getWorkspaceRoot(): string {
  const folder = vscode.workspace.workspaceFolders?.[0];
  assert.ok(folder, 'The test workspace is not open');
  return folder.uri.fsPath;
}

/** Deletes everything in the test workspace except .gitkeep. */
function cleanWorkspace(): void {
  const root = getWorkspaceRoot();
  for (const entry of fs.readdirSync(root)) {
    if (entry !== '.gitkeep') {
      fs.rmSync(path.join(root, entry), { recursive: true, force: true });
    }
  }
}

function writeFile(name: string, content = ''): void {
  fs.writeFileSync(path.join(getWorkspaceRoot(), name), content);
}

function exists(...segments: string[]): boolean {
  return fs.existsSync(path.join(getWorkspaceRoot(), ...segments));
}

async function setIdentification(mode: string | undefined): Promise<void> {
  await vscode.workspace
    .getConfiguration('ALStructureCreator')
    .update('ObjectIdentification', mode, vscode.ConfigurationTarget.Workspace);
}

suite('ALStructureCreator', () => {
  setup(cleanWorkspace);

  teardown(async () => {
    await setIdentification(undefined);
    cleanWorkspace();
  });

  test('Create All Folder Structure creates the autocreate folders', async () => {
    await vscode.commands.executeCommand('alstructurecreator.createallstructure');

    assert.ok(exists('src', 'codeunit'));
    assert.ok(exists('src', 'table'));
    assert.ok(exists('src', 'report', 'layout'));
    assert.ok(exists('logo'));
    assert.ok(exists('translations'));
    assert.ok(!exists('src', 'tableext'), 'tableext has autocreate false');
  });

  test('Reorganize Files (Suffix) moves each file to its folder', async () => {
    writeFile('CustomerTable.al');
    writeFile('CustomerTableExt.al');
    writeFile('CustomerPageExt.al');
    writeFile('Invoice.rdlc');
    writeFile('Logo.png');

    await vscode.commands.executeCommand('alstructurecreator.reorganizefiles');

    assert.ok(exists('src', 'table', 'CustomerTable.al'));
    assert.ok(exists('src', 'tableext', 'CustomerTableExt.al'));
    assert.ok(exists('src', 'pageext', 'CustomerPageExt.al'));
    assert.ok(exists('src', 'report', 'layout', 'Invoice.rdlc'));
    assert.ok(exists('logo', 'Logo.png'));
  });

  test('Reorganize Files (Object) reads the object type inside the file', async () => {
    await setIdentification('Object');
    writeFile('First.al', 'Codeunit 50100 "My Codeunit"\n{\n}\n');
    writeFile('Second.al', 'reportextension 50100 MyExt extends "Sales Invoice"\n{\n}\n');
    writeFile('Short.al', 'x');

    await vscode.commands.executeCommand('alstructurecreator.reorganizefiles');

    assert.ok(exists('src', 'codeunit', 'First.al'));
    assert.ok(exists('src', 'reportext', 'Second.al'));
    assert.ok(exists('Short.al'), 'unknown files stay where they are');
  });
});

import { WorkspaceFolder } from 'vscode';

/** Returns the path of the first workspace folder, or undefined when none is open. */
export const getWorkspaceFolder = (folders: readonly WorkspaceFolder[] | undefined): string | undefined => {
  return folders?.[0]?.uri.fsPath;
};

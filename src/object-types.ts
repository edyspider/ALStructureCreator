import * as path from 'path';
import type { ObjectIdents } from './structure-settings';

/** How the "Reorganize Files" command identifies the type of each AL file. */
export type IdentificationMode = 'Prefix' | 'Suffix' | 'Object';

/** One AL object type handled by the "Reorganize Files" command. */
export interface ObjectType {
  /** Key of the target folder in the FolderStructure setting. */
  folderKey: string;
  /** Property of ObjectIdents with the file name prefix/suffix for this type. */
  identKey: keyof ObjectIdents;
  /** Keyword that starts the object declaration inside an .al file. */
  alKeyword: string;
  /** File extensions (without the dot) that this type can have. */
  fileExtensions: string[];
}

/** All AL object types, one entry per type. Adding a type is one new line. */
export const OBJECT_TYPES: readonly ObjectType[] = [
  { folderKey: 'codeunit', identKey: 'codeUnit', alKeyword: 'codeunit', fileExtensions: ['al'] },
  { folderKey: 'controladdin', identKey: 'controlAddin', alKeyword: 'controladdin', fileExtensions: ['al'] },
  { folderKey: 'dotnet', identKey: 'dotNet', alKeyword: 'dotnet', fileExtensions: ['al'] },
  { folderKey: 'entitlement', identKey: 'entitlement', alKeyword: 'entitlement', fileExtensions: ['al'] },
  { folderKey: 'enum', identKey: 'enum', alKeyword: 'enum', fileExtensions: ['al'] },
  { folderKey: 'enumext', identKey: 'enumExt', alKeyword: 'enumextension', fileExtensions: ['al'] },
  { folderKey: 'interface', identKey: 'interface', alKeyword: 'interface', fileExtensions: ['al'] },
  { folderKey: 'page', identKey: 'page', alKeyword: 'page', fileExtensions: ['al'] },
  { folderKey: 'pageext', identKey: 'pageExt', alKeyword: 'pageextension', fileExtensions: ['al'] },
  { folderKey: 'permissionset', identKey: 'permissionSet', alKeyword: 'permissionset', fileExtensions: ['al', 'xml'] },
  { folderKey: 'permissionsetext', identKey: 'permissionSetExt', alKeyword: 'permissionsetextension', fileExtensions: ['al', 'xml'] },
  { folderKey: 'profile', identKey: 'profile', alKeyword: 'profile', fileExtensions: ['al'] },
  { folderKey: 'query', identKey: 'query', alKeyword: 'query', fileExtensions: ['al'] },
  { folderKey: 'report', identKey: 'report', alKeyword: 'report', fileExtensions: ['al'] },
  { folderKey: 'reportext', identKey: 'reportExt', alKeyword: 'reportextension', fileExtensions: ['al'] },
  { folderKey: 'table', identKey: 'table', alKeyword: 'table', fileExtensions: ['al'] },
  { folderKey: 'tableext', identKey: 'tableExt', alKeyword: 'tableextension', fileExtensions: ['al'] },
  { folderKey: 'xmlport', identKey: 'xmlPort', alKeyword: 'xmlport', fileExtensions: ['al'] },
];

/** Non-AL files that are moved by extension (layouts, images, translations). */
export const RESOURCE_FOLDERS: readonly { folderKey: string; fileExtensions: string[] }[] = [
  { folderKey: 'layout', fileExtensions: ['docx', 'rdl', 'rdlc', 'xlsx'] },
  { folderKey: 'logo', fileExtensions: ['gif', 'ico', 'jpg', 'png'] },
  { folderKey: 'translation', fileExtensions: ['xlf'] },
];

/** Returns the file extension in lower case and without the dot ("Page.AL" -> "al"). */
function getExtension(fileName: string): string {
  return path.extname(fileName).slice(1).toLowerCase();
}

/**
 * Finds the object type from the file name prefix or suffix.
 * When several identifiers match ("Page" and "PageExt" for "PageExtCustomer.al"),
 * the longest one wins, so each file matches exactly one type.
 */
export function matchFileName(fileName: string, mode: 'Prefix' | 'Suffix', idents: ObjectIdents): ObjectType | undefined {
  const extension = getExtension(fileName);
  const baseName = path.basename(fileName, path.extname(fileName));
  let bestMatch: ObjectType | undefined;

  for (const objectType of OBJECT_TYPES) {
    const ident = idents[objectType.identKey];
    if (!ident || !objectType.fileExtensions.includes(extension)) {
      continue;
    }
    const matches = mode === 'Prefix' ? baseName.startsWith(ident) : baseName.endsWith(ident);
    if (matches && (!bestMatch || ident.length > idents[bestMatch.identKey].length)) {
      bestMatch = objectType;
    }
  }
  return bestMatch;
}

/**
 * Finds the object type from the declaration inside an .al file, for example
 * "tableextension 50100 MyExt extends Customer". AL is not case sensitive, so
 * "Codeunit" and "codeunit" are the same. Reads at most `maxLines` lines.
 */
export function detectObjectType(content: string, maxLines: number): ObjectType | undefined {
  const lines = content.replace(/^\uFEFF/, '').split(/\r?\n/).slice(0, maxLines);

  for (const line of lines) {
    const keyword = line.trim().split(/\s+/)[0].toLowerCase();
    const objectType = OBJECT_TYPES.find((type) => type.alKeyword === keyword);
    if (objectType) {
      return objectType;
    }
  }
  return undefined;
}

/** Returns the folder key for layouts, images and translations, or undefined. */
export function matchResourceFolder(fileName: string): string | undefined {
  const extension = getExtension(fileName);
  return RESOURCE_FOLDERS.find((folder) => folder.fileExtensions.includes(extension))?.folderKey;
}

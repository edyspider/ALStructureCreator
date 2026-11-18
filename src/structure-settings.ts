import * as vscode from 'vscode';

const SETTINGS_SECTION = 'ALStructureCreator';

/** Property names used inside each folder entry of the FolderStructure setting. */
export interface FolderProperties {
  create: string;
  cust: string;
  name: string;
  subfolder: string;
}

/** Keys of the top-level folders in the FolderStructure setting. */
export interface RootFolders {
  logo: string;
  object: string;
  translation: string;
  webService: string;
}

/** Keys of the object folders inside the "object" folder. */
export interface ObjectFolders {
  codeUnit: string;
  controlAddin: string;
  dotNet: string;
  entitlement: string;
  enum: string;
  enumExt: string;
  interface: string;
  layout: string;
  page: string;
  pageExt: string;
  permissionSet: string;
  permissionSetExt: string;
  profile: string;
  query: string;
  report: string;
  reportExt: string;
  table: string;
  tableExt: string;
  xmlPort: string;
}

/** File extensions handled by the "Reorganize Files" command. */
export interface FileExtensions {
  al: string;
  docx: string;
  gif: string;
  icon: string;
  jpg: string;
  png: string;
  rdl: string;
  rdlc: string;
  xlf: string;
  xlsx: string;
  xml: string;
}

/** File name prefixes/suffixes that identify each object type. */
export interface ObjectIdents {
  codeUnit: string;
  controlAddin: string;
  dotNet: string;
  entitlement: string;
  enum: string;
  enumExt: string;
  interface: string;
  page: string;
  pageExt: string;
  permissionSet: string;
  permissionSetExt: string;
  profile: string;
  query: string;
  report: string;
  reportExt: string;
  table: string;
  tableExt: string;
  xmlPort: string;
}

/**
 * Reads a setting of this extension every time it is called, so changes
 * made by the user apply without reloading VS Code. `get` already merges
 * the default, user and workspace values.
 */
function readSetting<T>(key: string, defaultValue: T): T {
  return vscode.workspace.getConfiguration(SETTINGS_SECTION).get<T>(key, defaultValue);
}

export class StructureSettings {
  public static getStructureRootPath(): string {
    return `${SETTINGS_SECTION}.FolderStructure.structure`;
  }

  public static getObjectIdentification(): string {
    return readSetting('ObjectIdentification', 'Suffix');
  }

  public static getObjectMaxReadLine(): number {
    return readSetting('ObjectIdent.MaxReadLine', 15);
  }

  public static getFolderProperties(): FolderProperties {
    return {
      create: 'autocreate',
      cust: 'createcust',
      name: 'name',
      subfolder: 'subfolder',
    };
  }

  public static getRootFolders(): RootFolders {
    return {
      logo: 'logo',
      object: 'object',
      translation: 'translation',
      webService: 'webservice',
    };
  }

  public static getObjectFolders(): ObjectFolders {
    return {
      codeUnit: 'codeunit',
      controlAddin: 'controladdin',
      dotNet: 'dotnet',
      entitlement: 'entitlement',
      enum: 'enum',
      enumExt: 'enumExt',
      interface: 'interface',
      layout: 'layout',
      page: 'page',
      pageExt: 'pageExt',
      permissionSet: 'permissionset',
      permissionSetExt: 'permissionsetExt',
      profile: 'profile',
      query: 'query',
      report: 'report',
      reportExt: 'reportExt',
      table: 'table',
      tableExt: 'tableExt',
      xmlPort: 'xmlport',
    };
  }

  public static getFileExtensions(): FileExtensions {
    return {
      al: 'al',
      docx: 'docx',
      gif: 'gif',
      icon: 'icon',
      jpg: 'jpg',
      png: 'png',
      rdl: 'rdl',
      rdlc: 'rdlc',
      xlf: 'xlf',
      xlsx: 'xlsx',
      xml: 'xml',
    };
  }

  public static getObjectIdents(): ObjectIdents {
    return {
      codeUnit: readSetting('ObjectIdent.Codeunit', 'Codeunit'),
      controlAddin: readSetting('ObjectIdent.ControlAddin', 'ControlAddin'),
      dotNet: readSetting('ObjectIdent.DotNet', 'DotNet'),
      entitlement: readSetting('ObjectIdent.Entitlement', 'Entitlement'),
      enum: readSetting('ObjectIdent.Enum', 'Enum'),
      enumExt: readSetting('ObjectIdent.EnumExt', 'EnumExt'),
      interface: readSetting('ObjectIdent.Interface', 'Interface'),
      page: readSetting('ObjectIdent.Page', 'Page'),
      pageExt: readSetting('ObjectIdent.PageExt', 'PageExt'),
      permissionSet: readSetting('ObjectIdent.PermissionSet', 'PermissionSet'),
      permissionSetExt: readSetting('ObjectIdent.PermissionSetExt', 'PermissionSetExt'),
      profile: readSetting('ObjectIdent.Profile', 'Profile'),
      query: readSetting('ObjectIdent.Query', 'Query'),
      report: readSetting('ObjectIdent.Report', 'Report'),
      reportExt: readSetting('ObjectIdent.ReportExt', 'ReportExt'),
      table: readSetting('ObjectIdent.Table', 'Table'),
      tableExt: readSetting('ObjectIdent.TableExt', 'TableExt'),
      xmlPort: readSetting('ObjectIdent.XmlPort', 'XmlPort'),
    };
  }
}

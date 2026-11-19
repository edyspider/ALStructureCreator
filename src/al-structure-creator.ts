import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

import { InputBoxOptions } from "vscode";
import { IDisposable } from './disposable.interface';
import { VSCodeWindow } from './vscode.interfaces';
import { ALFolderExistsError } from './errors/al-folder-exists.error';
import { StructureSettings, ObjectIdents } from './structure-settings';
import { IdentificationMode, detectObjectType, matchFileName, matchResourceFolder } from './object-types';

export class ALStructureCreator implements IDisposable {
  constructor(
    private workspaceRoot: string,
    private window: VSCodeWindow
  ) { }
  
  async execute(): Promise<void> {
    const rootPath = StructureSettings.getStructureRootPath();
    this.createAllFolderStructure(rootPath,"");

    this.window.showInformationMessage(`ALStructureCreator: Create All Folder Structure Executed`);
  }

  async addNewFolder(): Promise<void> {
    const foldersName: string[] = ["tab, table", "tabext, tableext", "pag, page", "pagext, pageext", "cod, codeunit", "rep, report", "repext, reportext", "xml, xmlport", "int, interface", "enu, enum", "enuext, enumext", "ent, entitlement", "dnet, dotnet", "pers, permissionset", "persext, permissionsetext", "tran, translations"];
    const rndInt = Math.floor(Math.random() * foldersName.length);

    const options: InputBoxOptions = {
      ignoreFocusOut: true,
      prompt: 'Write the key name of the new folder',
      placeHolder: foldersName[rndInt],
      validateInput: this.validate
    };

    const newFolder = await this.window.showInputBox(options);

    if (!newFolder) {
      this.window.showInformationMessage(`ALStructureCreator: No folder set to be executed`);
      return;
    }

    if (this.createFolderStructure(newFolder)) {
      this.window.showInformationMessage(`ALStructureCreator: Create Folder Structure Executed`);
    }
  }

  createAllFolderStructure(folder: string, subdir: string) {
    const folderProp = StructureSettings.getFolderProperties();

    if(vscode.workspace.getConfiguration().get(folder)) {
      const inspect = vscode.workspace.getConfiguration().get(folder);

      const hasFolders = Boolean(inspect);

      if(hasFolders) {
        const obj = JSON.parse(JSON.stringify(inspect));

        for(const index in obj) {
          const root = JSON.parse(JSON.stringify(index));
          let folderName: string = "";
          let autoCreate: boolean = false;
          let createCust: boolean = false;

          // check root folders properties
          const rootPath = this.appendProp(folder,root);

          // check auto-create
          const autoCreatePath = this.appendProp(rootPath,folderProp.create);
          if (vscode.workspace.getConfiguration().has(autoCreatePath)) {
            autoCreate = (<boolean>vscode.workspace.getConfiguration().get(autoCreatePath));
          }

          if(autoCreate) {
            // check name
            const folderPath = this.appendProp(rootPath,folderProp.name);
            if (vscode.workspace.getConfiguration().has(folderPath)) {
              folderName = `${vscode.workspace.getConfiguration().get(folderPath)}`;
              this.createFolder(folderName,subdir);
            }
          }

          // check create-cust
          const createCustPath = this.appendProp(rootPath,folderProp.cust);
          if (vscode.workspace.getConfiguration().has(createCustPath)) {
            createCust = (<boolean>vscode.workspace.getConfiguration().get(createCustPath));
          }

          if(createCust) {
            // check name
            const folderPath = this.appendProp(rootPath,folderProp.name);
            if (vscode.workspace.getConfiguration().has(folderPath)) {
              folderName = `${vscode.workspace.getConfiguration().get(folderPath)}` + 'cust';
              this.createFolder(folderName,subdir);
            }
          }

          // check sub-folders
          const subFolderPath = this.appendProp(rootPath,folderProp.subfolder);
          if (vscode.workspace.getConfiguration().has(subFolderPath)) {
            if (subdir !== "") {
              this.createAllFolderStructure(subFolderPath,path.join(subdir, folderName));
            } else {
              this.createAllFolderStructure(subFolderPath,folderName);
            }
          }
        }
      }
    }
  }

  createFolderStructure(newFolderKey: string): boolean {
    const rootEnum = StructureSettings.getRootFolders();
    const objEnum = StructureSettings.getObjectFolders();
    let newFolderDir: string;

    switch(newFolderKey.toLocaleLowerCase()) {
      case "cod":
      case "codeunit":
        newFolderDir = this.getFolderTypePath(objEnum.codeUnit);
        break;
      case "ctrl":
      case "controladdin":
        newFolderDir = this.getFolderTypePath(objEnum.controlAddin);
        break;
      case "dnet":
      case "dotnet":
        newFolderDir = this.getFolderTypePath(objEnum.dotNet);
        break;
      case "ent":
      case "entitlement":
        newFolderDir = this.getFolderTypePath(objEnum.entitlement);
        break;
      case "enu":
      case "enum":
        newFolderDir = this.getFolderTypePath(objEnum.enum);
        break;
      case "enuext":
      case "enumext":
        newFolderDir = this.getFolderTypePath(objEnum.enumExt);
        break;
      case "int":
      case "interface":
        newFolderDir = this.getFolderTypePath(objEnum.interface);
        break;
      case "lay":
      case "layout":
        newFolderDir = this.getFolderTypePath(objEnum.layout);
        break;
      case "pag":
      case "page":
        newFolderDir = this.getFolderTypePath(objEnum.page);
        break;
      case "pagext":
      case "pageext":
        newFolderDir = this.getFolderTypePath(objEnum.pageExt);
        break;
      case "pers":
      case "permissionset":
        newFolderDir = this.getFolderTypePath(objEnum.permissionSet);
        break;
      case "persext":
      case "permissionsetext":
        newFolderDir = this.getFolderTypePath(objEnum.permissionSetExt);
        break;
      case "pro":
      case "profile":
        newFolderDir = this.getFolderTypePath(objEnum.profile);
        break;
      case "que":
      case "query":
        newFolderDir = this.getFolderTypePath(objEnum.query);
        break;
      case "rep":
      case "report":
        newFolderDir = this.getFolderTypePath(objEnum.report);
        break;
      case "repext":
      case "reportext":
        newFolderDir = this.getFolderTypePath(objEnum.reportExt);
        break;
      case "tab":
      case "table":
        newFolderDir = this.getFolderTypePath(objEnum.table);
        break;
      case "tabext":
      case "tableext":
        newFolderDir = this.getFolderTypePath(objEnum.tableExt);
        break;
      case "xml":
      case "xmlport":
        newFolderDir = this.getFolderTypePath(objEnum.xmlPort);
        break;
      case rootEnum.logo:
        newFolderDir = this.getFolderTypePath(rootEnum.logo);
        break;
      case "src":
      case "obj":
      case rootEnum.object:
        newFolderDir = this.getFolderTypePath(rootEnum.object);
        break;
      case "tran":
      case rootEnum.translation:
        newFolderDir = this.getFolderTypePath(rootEnum.translation);
        break;
      case "web":
      case rootEnum.webService:
        newFolderDir = this.getFolderTypePath(rootEnum.webService);
        break;
      default:
        newFolderDir = this.getFolderTypePath(newFolderKey) || path.join(this.workspaceRoot, newFolderKey);
        break;
    }

    if (newFolderDir === "") {
      this.window.showErrorMessage(`ALStructureCreator Error: folder '${newFolderKey}' was not found in the FolderStructure setting.`);
      return false;
    }

    try {
      if (fs.existsSync(newFolderDir)) {
        throw new ALFolderExistsError(`Folder '${newFolderKey}' already exists`);
      }
      fs.mkdirSync(newFolderDir, { recursive: true });
      return true;
    } catch (err) {
      if (err instanceof ALFolderExistsError) {
        this.window.showErrorMessage(`ALStructureCreator Error: '${err.message}'.`);
      } else {
        this.window.showErrorMessage(`Error: ${(err as Error).message}`);
      }
      return false;
    }
  }

  createFolder(folderName: string, subdir: string): boolean {
    let folderDir;

    try {
      const absolutePath = this.toAbsolutePath(subdir);
      folderDir = path.join(absolutePath, folderName);

      if(!fs.existsSync(folderDir)) {
        fs.mkdirSync(`${folderDir}`);
        
        return true;
      } else {
        throw new ALFolderExistsError(`Folder '${folderName}' already exists.`);
      }
    } catch (err) {
      console.log(`Error: ${(err as Error).message}`);
    }

    return false;
  }

    reorganizeAppFiles(): void {
    const rootFolder = this.toAbsolutePath('');
    const mode = StructureSettings.getObjectIdentification() as IdentificationMode;
    const idents = StructureSettings.getObjectIdents();
    const maxLines = StructureSettings.getObjectMaxReadLine();
    const errors: string[] = [];
    let movedFiles = 0;

    for (const entry of fs.readdirSync(rootFolder, { withFileTypes: true })) {
      if (!entry.isFile()) {
        continue;
      }

      // Each file is handled on its own, so one error does not stop the others.
      try {
        const folderKey = this.getTargetFolderKey(path.join(rootFolder, entry.name), mode, idents, maxLines);
        if (!folderKey) {
          continue;
        }

        const targetFolder = this.getFolderTypePath(folderKey);
        if (targetFolder === '') {
          errors.push(`${entry.name}: folder '${folderKey}' not found in the FolderStructure setting`);
          continue;
        }

        const targetFile = path.join(targetFolder, entry.name);
        if (fs.existsSync(targetFile)) {
          errors.push(`${entry.name}: already exists in '${targetFolder}'`);
          continue;
        }

        fs.mkdirSync(targetFolder, { recursive: true });
        fs.renameSync(path.join(rootFolder, entry.name), targetFile);
        movedFiles++;
      } catch (err) {
        errors.push(`${entry.name}: ${(err as Error).message}`);
      }
    }

    if (errors.length > 0) {
      this.window.showErrorMessage(`ALStructureCreator: ${errors.length} file(s) were not moved. ${errors.join('; ')}`);
    }
    this.window.showInformationMessage(`ALStructureCreator: Reorganize App Files Executed (${movedFiles} file(s) moved)`);
  }

  /** Decides the target folder key of one file, or undefined to leave it where it is. */
  private getTargetFolderKey(filePath: string, mode: IdentificationMode, idents: ObjectIdents, maxLines: number): string | undefined {
    const resourceFolder = matchResourceFolder(filePath);
    if (resourceFolder) {
      return resourceFolder;
    }

    if (mode === 'Object') {
      if (path.extname(filePath).toLowerCase() !== '.al') {
        return undefined;
      }
      return detectObjectType(fs.readFileSync(filePath, 'utf-8'), maxLines)?.folderKey;
    }

    return matchFileName(path.basename(filePath), mode, idents)?.folderKey;
  }

  getFolderTypePath(folderType: string): string {
    const folderLevels: string[] = [];
    const folder = StructureSettings.getStructureRootPath();
    let folderPath: FolderType = {currentFolder:folder, folderFound: false};
    folderPath = this.searchFolderTypePath(folderType,folder,0,folderLevels,folderPath);
    if(folderPath.folderFound) {
      return folderPath.currentFolder;
    } else {
      return '';
    }
  }

  searchFolderTypePath(folderType: string, folder:string, level: number, folderLevels: string[], currFolderType: FolderType): FolderType {
    const folderProp = StructureSettings.getFolderProperties();
    //var currFolder: string = '';

    if(vscode.workspace.getConfiguration().get(folder)) {
      const inspect = vscode.workspace.getConfiguration().get(folder);

      let rootFolder = this.toAbsolutePath('');
      switch(level) {
        case 1:
          rootFolder = path.join(rootFolder, folderLevels[0]);
          break;
        case 2:
          rootFolder = path.join(rootFolder, folderLevels[0]);
          rootFolder = path.join(rootFolder, folderLevels[1]);
          break;
        case 3:
          rootFolder = path.join(rootFolder, folderLevels[0]);
          rootFolder = path.join(rootFolder, folderLevels[1]);
          rootFolder = path.join(rootFolder, folderLevels[2]);
          break;
        case 4:
          rootFolder = path.join(rootFolder, folderLevels[0]);
          rootFolder = path.join(rootFolder, folderLevels[1]);
          rootFolder = path.join(rootFolder, folderLevels[2]);
          rootFolder = path.join(rootFolder, folderLevels[3]);
          break;
      }
      currFolderType.currentFolder = rootFolder;
      

      const obj = JSON.parse(JSON.stringify(inspect));
      for(const index in obj) {
        const root = JSON.parse(JSON.stringify(index));
        let folderName: string = "";

        // check root folders properties
        const rootPath = this.appendProp(folder,root);
            
        // check name
        const configPath = this.appendProp(rootPath,folderProp.name);
        if (vscode.workspace.getConfiguration().has(configPath)) {
          folderName = `${vscode.workspace.getConfiguration().get(configPath)}`;

          if (folderType === root) {
            currFolderType.folderFound = true;
            currFolderType.currentFolder = path.join(rootFolder, folderName);
            folderLevels[level] = folderName;
            return currFolderType;
          }
        }

        // check sub-folders
        const subConfigPath = this.appendProp(rootPath,folderProp.subfolder);
        if (vscode.workspace.getConfiguration().has(subConfigPath)) {
          folderLevels[level] = folderName;
          level += 1;
          currFolderType = this.searchFolderTypePath(folderType,subConfigPath,level,folderLevels,currFolderType);

          if(currFolderType.folderFound) {
            return currFolderType;
          }
        }
      }
    }
    return currFolderType;
  }

  validate(name: string): string | null {
    if (!name) {
      return 'Name is required';
    }

    if (name.includes(' ')) {
      return 'Blank spaces are not allowed';
    }
    
    const regex = /^[A-Za-z0-9 ]+$/;
    const isValid = regex.test(name);
    if (!isValid) {
      return 'Special characters are not allowed';
    }

    // no errors
    return null;
  }
  
  toAbsolutePath(nameOrRelativePath: string): string {
      // simple test for slashes in string
      if (/\/|\\/.test(nameOrRelativePath)) {
        return path.resolve(this.workspaceRoot, nameOrRelativePath);
      }
      // if it's just the name of the al, assume that it'll be in 'src/state/project/'
      return path.resolve(this.workspaceRoot, "", nameOrRelativePath);
  }

  dispose(): void {
      console.log('Disposing "al-structure-creator". See you soon...');
  }

  appendProp(current: string, property: string): string {
    return (current+'.'+property);
  }
}

type FolderType = {
  currentFolder: string;
  folderFound: boolean;
};
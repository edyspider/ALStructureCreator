import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

import { readFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';

import { InputBoxOptions } from "vscode";
import { IDisposable } from './disposable.interface';
import { VSCodeWindow } from './vscode.interfaces';
import { ALFolderExistsError } from './errors/al-folder-exists.error';
import { StructureSettings } from './StructureSettings';
import { exit } from 'process';

export class ALStructureCreator implements IDisposable {
  constructor(
    private workspaceRoot: string,
    private window: VSCodeWindow
  ) { }
  
  async execute(): Promise<void> {
    var rootPath = StructureSettings.GetStructureRootPath();
    this.createAllFolderStructure(rootPath,"");

    this.window.showInformationMessage(`ALStructureCreator: Create All Folder Structure Executed`);
  }

  async addNewFolder(): Promise<void> {
    let forldersName: string[] = ["tab, table", "pag, page", "cod, codeunit", "rep, report", "xml, xmlport", "int, interface", "enu, enum", "ent, entitlement", "dnet, dotnet", "pers, permissionset", "tran, translations"];
    const rndInt = Math.floor(Math.random() * 11) + 1;

    const options: InputBoxOptions = {
      ignoreFocusOut: true,
      prompt: 'Write the key name of the new folder',
      placeHolder: forldersName[rndInt],
      validateInput: this.validate
    };

    var newFolder = <string>await this.window.showInputBox(options);
    var rootPath = StructureSettings.GetStructureRootPath();

    if(newFolder !== "") {
      this.createFolderStructure(newFolder,rootPath,'');
    }

    this.window.showInformationMessage(`ALStructureCreator: Create Folder Structure Executed`);
  }

  createAllFolderStructure(folder: string, subdir: string) {
    let folderProp = StructureSettings.GetFolderProperties().getFolderProperties();

    if(vscode.workspace.getConfiguration().get(folder)) {
      let inspect;
      if(!vscode.workspace.getConfiguration().inspect(folder)?.globalValue) {
        inspect = vscode.workspace.getConfiguration().inspect(folder)?.defaultValue;
      } else {
        inspect = vscode.workspace.getConfiguration().inspect(folder)?.globalValue;
      }

      let hasFolders: boolean = false;
      hasFolders = (<boolean>inspect);

      if(hasFolders) {
        var obj;
        obj = JSON.parse(JSON.stringify(inspect));

        for(var index in obj) {
          var root = JSON.parse(JSON.stringify(index));
          let folderName: string = "";
          let autoCreate: boolean = false;
          let createCust: boolean = false;
          let createExt: boolean = false;
          var folderDir;

          // check root folders properties
          const rootPath = this.appendProp(folder,root);
          var inspectRoot;
          if(!vscode.workspace.getConfiguration().inspect(rootPath)?.globalValue) {
            inspectRoot = vscode.workspace.getConfiguration().inspect(rootPath)?.defaultValue;
          } else {
            inspectRoot = vscode.workspace.getConfiguration().inspect(rootPath)?.globalValue;
          }

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

          // check create-ext
          const createExtPath = this.appendProp(rootPath,folderProp.ext);
          if (vscode.workspace.getConfiguration().has(createExtPath)) {
            createExt = (<boolean>vscode.workspace.getConfiguration().get(createExtPath));
          }

          if(createExt) {
            // check name
            const folderPath = this.appendProp(rootPath,folderProp.name);
            if (vscode.workspace.getConfiguration().has(folderPath)) {
              folderName = `${vscode.workspace.getConfiguration().get(folderPath)}` + 'ext';
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

  createFolderStructure(newFolderKey: string, folder: string, subdir: string) {
    let rootEnum = StructureSettings.GetStructureProperties().getRootEnum();
    let objEnum = StructureSettings.GetStructureProperties().getObjectEnum();
    var newFolderDir: string = "";

    switch(newFolderKey.toLocaleLowerCase()) {
      case "cod":
      case "codeunit":
        newFolderDir = this.getFolderTypePath(objEnum.codeunit);
        break;
      case "ctrl":
      case "controladdin":
        newFolderDir = this.getFolderTypePath(objEnum.controladdin);
        break;
      case "dnet":
      case "dotnet":
        newFolderDir = this.getFolderTypePath(objEnum.dotnet);
        break;
      case "ent":
      case "entitlement":
        newFolderDir = this.getFolderTypePath(objEnum.entitlement);
        break;
      case "enu":
      case "enum":
        newFolderDir = this.getFolderTypePath(objEnum.enum);
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
      case objEnum.page:
        newFolderDir = this.getFolderTypePath(objEnum.page);
        break;
      case "pers":
      case "permissionset":
        newFolderDir = this.getFolderTypePath(objEnum.permissionset);
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
      case "tab":
      case "table":
        newFolderDir = this.getFolderTypePath(objEnum.table);
        break;
      case "xml":
      case "xmlport":
        newFolderDir = this.getFolderTypePath(objEnum.xmlport);
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
      case rootEnum.webservice:
        newFolderDir = this.getFolderTypePath(rootEnum.webservice);
        break;
    }

    try {
      if(newFolderDir !== "") {
        if(!fs.existsSync(newFolderDir)) {
          fs.mkdirSync(newFolderDir, { recursive: true });
          console.log(`Folder ${newFolderDir} created`);
        } else {
          throw new ALFolderExistsError(`Folder '${newFolderKey}' already exists`);
        }
      }
    } catch (err) {
      if (err instanceof ALFolderExistsError) {
        this.window.showErrorMessage(`ALStructureCreator Error: '${err.message}'.`);
      } else {
        this.window.showErrorMessage(`Error: ${(err as Error).message}`);
      }
    }
  }

  createFolder(folderName: string, subdir: string): boolean {
    var folderDir;

    try {
      let absolutePath = this.toAbsolutePath(subdir);
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

  reorganizeAppFiles() {
    var folderLogo = this.getFolderTypePath('logo');
    var folderCodeunit = this.getFolderTypePath('codeunit');
    var folderControlAddin = this.getFolderTypePath('controladdin');
    var folderDotNet = this.getFolderTypePath('dotnet');
    var folderEntitlement = this.getFolderTypePath('entitlement');
    var folderEnum = this.getFolderTypePath('enum');
    var folderEnumExt = this.getFolderTypePath('enum') + 'ext';
    var folderInterface = this.getFolderTypePath('interface');
    var folderPage = this.getFolderTypePath('page');
    var folderPageExt = this.getFolderTypePath('page') + 'ext';
    var folderPermissionSet = this.getFolderTypePath('permissionset');
    var folderProfile = this.getFolderTypePath('profile');
    var folderQuery = this.getFolderTypePath('query');
    var folderReport = this.getFolderTypePath('report');
    var folderLayout = this.getFolderTypePath('layout');
    var folderTable = this.getFolderTypePath('table');
    var folderTableExt = this.getFolderTypePath('table') + 'ext';
    var folderXmlport = this.getFolderTypePath('xmlport');
    var folderTranslation = this.getFolderTypePath('translation');
    //var folderWebService = this.getFolderTypePath('webservice');

    var fileExt = StructureSettings.GetFileExtensions().getFileExtensons();
    var objTypeName = StructureSettings.GetObjectsIdent().getObjectIdents();
    var handled: boolean;

    const objIdentCodeunit = objTypeName.codeunit;
    const objIdentControlAddin = objTypeName.controladdin;
    const objIdentDotNet = objTypeName.dotnet;
    const objIdentEntitlement = objTypeName.entitlement;
    const objIdentEnum = objTypeName.enum;
    const objIdentInterface = objTypeName.interface;
    const objIdentPage = objTypeName.page;
    const objIdentPermissionSet = objTypeName.permissionset;
    const objIdentProfile = objTypeName.profile;
    const objIdentQuery = objTypeName.query;
    const objIdentReport = objTypeName.report;
    const objIdentTable = objTypeName.table;
    const objIdentXmlport = objTypeName.xmlport;

    const rootFolder = this.toAbsolutePath('');
    const objIdent = StructureSettings.GetobjIdentification();

    try {
      fs.readdirSync(rootFolder).forEach(file => {
        handled = false;
        var fileNameLength = file.length;
        switch(objIdent) {
          case "Prefix":
            // --> PermissionSet.xml files
            if(file.split('.').pop() === fileExt.xml) {
              if(file.startsWith(objIdentPermissionSet)) {
                this.syncFolderPath(folderPermissionSet);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderPermissionSet, path.basename(file)));
              }
            }
            
            // AL files
            if(file.split('.').pop() === fileExt.al) {
              // --> Codeunit
              if(file.startsWith(objIdentCodeunit)) {
                this.syncFolderPath(folderCodeunit);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderCodeunit, path.basename(file)));
              }

              // --> ControlAddin
              if(file.startsWith(objIdentControlAddin)) {
                this.syncFolderPath(folderControlAddin);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderControlAddin, path.basename(file)));
              }

              // --> DotNet
              if(file.startsWith(objIdentDotNet)) {
                this.syncFolderPath(folderDotNet);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderDotNet, path.basename(file)));
              }

              // --> Entitlement
              if(file.startsWith(objIdentEntitlement)) {
                this.syncFolderPath(folderEntitlement);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderEntitlement, path.basename(file)));
              }

              // --> Enum
              if(file.startsWith(objIdentEnum)) {
                this.syncFolderPath(folderEnum);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderEnum, path.basename(file)));
              }

              // --> Interface
              if(file.startsWith(objIdentInterface)) {
                this.syncFolderPath(folderInterface);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderInterface, path.basename(file)));
              }

              // --> Page
              if(file.startsWith(objIdentPage)) {
                this.syncFolderPath(folderPage);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderPage, path.basename(file)));
              }

              // --> Profile
              if(file.startsWith(objIdentProfile)) {
                this.syncFolderPath(folderProfile);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderProfile, path.basename(file)));
              }

              // --> Query
              if(file.startsWith(objIdentQuery)) {
                this.syncFolderPath(folderQuery);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderQuery, path.basename(file)));
              }

              // --> Report
              if(file.startsWith(objIdentReport)) {
                this.syncFolderPath(folderReport);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderReport, path.basename(file)));
              }

              // --> Table
              if(file.startsWith(objIdentTable)) {
                this.syncFolderPath(folderTable);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderTable, path.basename(file)));
              }

              // --> Xmlport
              if(file.startsWith(objIdentXmlport)) {
                this.syncFolderPath(folderXmlport);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderXmlport, path.basename(file)));
              }
            }
            break;
          case "Suffix":
            // PermissionSet.xml files
            if(file.split('.').pop() === fileExt.xml) {
              if(file.endsWith(objIdentPermissionSet,(fileNameLength-4))) {
                this.syncFolderPath(folderPermissionSet);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderPermissionSet, path.basename(file)));
              }
            }

            // AL files
            if(file.split('.').pop() === fileExt.al) {
              // --> Codeunit
              if(file.endsWith(objIdentCodeunit,(fileNameLength-3))) {
                this.syncFolderPath(folderCodeunit);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderCodeunit, path.basename(file)));
              }

              // --> ControlAddin
              if(file.endsWith(objIdentControlAddin,(fileNameLength-3))) {
                this.syncFolderPath(folderControlAddin);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderControlAddin, path.basename(file)));
              }

              // --> DotNet
              if(file.endsWith(objIdentDotNet,(fileNameLength-3))) {
                this.syncFolderPath(folderDotNet);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderDotNet, path.basename(file)));
              }

              // --> Entitlement
              if(file.endsWith(objIdentEntitlement,(fileNameLength-3))) {
                this.syncFolderPath(folderEntitlement);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderEntitlement, path.basename(file)));
              }

              // --> Enum
              if(file.endsWith(objIdentEnum,(fileNameLength-3))) {
                this.syncFolderPath(folderEnum);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderEnum, path.basename(file)));
              }

              // --> Interface
              if(file.endsWith(objIdentInterface,(fileNameLength-3))) {
                this.syncFolderPath(folderInterface);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderInterface, path.basename(file)));
              }

              // --> Page
              if(file.endsWith(objIdentPage,(fileNameLength-3))) {
                this.syncFolderPath(folderPage);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderPage, path.basename(file)));
              }

              // --> Profile
              if(file.endsWith(objIdentProfile,(fileNameLength-3))) {
                this.syncFolderPath(folderProfile);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderProfile, path.basename(file)));
              }

              // --> Query
              if(file.endsWith(objIdentQuery,(fileNameLength-3))) {
                this.syncFolderPath(folderQuery);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderQuery, path.basename(file)));
              }

              // --> Report
              if(file.endsWith(objIdentReport,(fileNameLength-3))) {
                this.syncFolderPath(folderReport);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderReport, path.basename(file)));
              }

              // --> Table
              if(file.endsWith(objIdentTable,(fileNameLength-3))) {
                this.syncFolderPath(folderTable);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderTable, path.basename(file)));
              }

              // --> Xmlport
              if(file.endsWith(objIdentXmlport,(fileNameLength-3))) {
                this.syncFolderPath(folderXmlport);
                fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderXmlport, path.basename(file)));
              }
            }
            break;
          case "Object":
            // AL files
            if(file.split('.').pop() === fileExt.al) {
              let filepath = path.join(rootFolder, path.basename(file));
              let objType = this.getAlObjectType(filepath);

              switch(objType) {
                case "codeunit":
                  this.syncFolderPath(folderCodeunit);
                  fs.renameSync(filepath,path.join(folderCodeunit, path.basename(file)));
                  break;
                case "entitlement":
                    this.syncFolderPath(folderEntitlement);
                    fs.renameSync(filepath,path.join(folderEntitlement, path.basename(file)));
                    break;
                case "enum":
                  this.syncFolderPath(folderEnum);
                  fs.renameSync(filepath,path.join(folderEnum, path.basename(file)));
                  break;
                case "enumextension":
                  this.syncFolderPath(folderEnumExt);
                  fs.renameSync(filepath,path.join(folderEnumExt, path.basename(file)));
                  break;
                case "page":
                  this.syncFolderPath(folderPage);
                  fs.renameSync(filepath,path.join(folderPage, path.basename(file)));
                  break;
                case "pageextension":
                  this.syncFolderPath(folderPageExt);
                  fs.renameSync(filepath,path.join(folderPageExt, path.basename(file)));
                  break;
                case "permissionset":
                  this.syncFolderPath(folderPermissionSet);
                  fs.renameSync(filepath,path.join(folderPermissionSet, path.basename(file)));
                  break;
                case "profile":
                  this.syncFolderPath(folderProfile);
                  fs.renameSync(filepath,path.join(folderProfile, path.basename(file)));
                  break;
                case "query":
                  this.syncFolderPath(folderQuery);
                  fs.renameSync(filepath,path.join(folderQuery, path.basename(file)));
                  break;
                case "report":
                  this.syncFolderPath(folderReport);
                  fs.renameSync(filepath,path.join(folderReport, path.basename(file)));
                  break;
                case "table":
                  this.syncFolderPath(folderTable);
                  fs.renameSync(filepath,path.join(folderTable, path.basename(file)));
                  break;
                case "tableextension":
                  this.syncFolderPath(folderTableExt);
                  fs.renameSync(filepath,path.join(folderTableExt, path.basename(file)));
                  break;
                case "xmlport":
                  this.syncFolderPath(folderXmlport);
                  fs.renameSync(filepath,path.join(folderXmlport, path.basename(file)));
                  break;
                default:
                  console.log("no identified al object for the file " + file.toString());
                  break;
              }
            }

            break;
        }
        
        // --> DOCX, RDL, RDLC & XLSX files
        if((file.split('.').pop() === fileExt.docx) || (file.split('.').pop() === fileExt.rdl) || (file.split('.').pop() === fileExt.rdlc) || (file.split('.').pop() === fileExt.xlsx)) {
          this.syncFolderPath(folderLayout);
          fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderLayout, path.basename(file)));
        }

        // --> GIF, ICON, JPG & PNG files
        if((file.split('.').pop() === fileExt.gif) || (file.split('.').pop() === fileExt.icon) || (file.split('.').pop() === fileExt.jpg) || (file.split('.').pop() === fileExt.png)) {
          this.syncFolderPath(folderLogo);
          fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderLogo, path.basename(file)));
        }

        // --> Translation.xlf files
        if(file.split('.').pop() === fileExt.xlf) {
          this.syncFolderPath(folderTranslation);
          fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(folderTranslation, path.basename(file)));
        }
      });
    } catch (err) {
      if (err instanceof ALFolderExistsError) {
        this.window.showErrorMessage(`ALStructureCreator Error: '${err.message}'.`);
      } else {
        this.window.showErrorMessage(`Error: ${(err as Error).message}`);
      }
    }

    this.window.showInformationMessage(`ALStructureCreator: Reorganize App Files Executed`);
  }

  getAlObjectType(filename: string): string {
    const result = readFileSync(filename, 'utf-8');
    const maxReadLine = StructureSettings.GetObjectMaxReadLine();

    let textLine = "";
    let objFound = "";
    let i = 0;
    let foundObj = false;

    while ((i<maxReadLine) && (foundObj === false)) {
      textLine = result.split("\n")[i];

      if (textLine.startsWith("codeunit ")) {
        objFound = "codeunit";
        foundObj = true;
      }
      if (textLine.startsWith("entitlement ")) {
        objFound = "entitlement";
        foundObj = true;
      }
      if (textLine.startsWith("enum ")) {
        objFound = "enum";
        foundObj = true;
      }
      if (textLine.startsWith("enumextension ")) {
        objFound = "enumextension";
        foundObj = true;
      }
      if (textLine.startsWith("page ")) {
        objFound = "page";
        foundObj = true;
      }
      if (textLine.startsWith("pageextension ")) {
        objFound = "pageextension";
        foundObj = true;
      }
      if (textLine.startsWith("permissionset ")) {
        objFound = "permissionset";
        foundObj = true;
      }
      if (textLine.startsWith("profile ")) {
        objFound = "profile";
        foundObj = true;
      }
      if (textLine.startsWith("query ")) {
        objFound = "query";
        foundObj = true;
      }
      if (textLine.startsWith("report ")) {
        objFound = "report";
        foundObj = true;
      }
      if (textLine.startsWith("table ")) {
        objFound = "table";
        foundObj = true;
      }
      if (textLine.startsWith("tableextension ")) {
        objFound = "tableextension";
        foundObj = true;
      }
      if (textLine.startsWith("xmlport ")) {
        objFound = "xmlport";
        foundObj = true;
      }
      i++;
    }

    return objFound;
  }

  getFolderTypePath(folderType: string): string {
    var folderLevels: string[] = [];
    var folder = StructureSettings.GetStructureRootPath();
    var folderPath: FolderType = {currentFolder:folder, folderFound: false};
    folderPath = this.searchFolderTypePath(folderType,folder,0,folderLevels,folderPath);
    if(folderPath.folderFound) {
      return folderPath.currentFolder;
    } else {
      return '';
    }
  }

  searchFolderTypePath(folderType: string, folder:string, level: number, folderLevels: string[], currFolderType: FolderType): FolderType {
    let folderProp = StructureSettings.GetFolderProperties().getFolderProperties();
    //var currFolder: string = '';

    if(vscode.workspace.getConfiguration().get(folder)) {
      let inspect;
      if(!vscode.workspace.getConfiguration().inspect(folder)?.globalValue) {
        inspect = vscode.workspace.getConfiguration().inspect(folder)?.defaultValue;
      } else {
        inspect = vscode.workspace.getConfiguration().inspect(folder)?.globalValue;
      }

      var rootFolder = this.toAbsolutePath('');
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
      

      var obj = JSON.parse(JSON.stringify(inspect));
      for(var index in obj) {
        var root = JSON.parse(JSON.stringify(index));
        let folderName: string = "";

        // check root folders properties
        const rootPath = this.appendProp(folder,root);
        var inspectRoot;
        if(!vscode.workspace.getConfiguration().inspect(rootPath)?.globalValue) {
          inspectRoot = vscode.workspace.getConfiguration().inspect(rootPath)?.defaultValue;
        } else {
          inspectRoot = vscode.workspace.getConfiguration().inspect(rootPath)?.globalValue;
        }
            
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
  
  syncFolderPath(folderPath: string) {
    try {
      if(!fs.existsSync(folderPath)) {
        fs.mkdirSync(`${folderPath}`);
      }
    } catch (err) {
      if (err instanceof ALFolderExistsError) {
        this.window.showErrorMessage(`ALStructureCreator Error: '${err.message}'.`);
      } else {
        this.window.showErrorMessage(`Error: ${(err as Error).message}`);
      }
    }
  }

  validate(name: string): string | null {
    if (!name) {
      return 'Name is required';
    }

    if (name.includes(' ')) {
      return 'Blank spaces are not allowed';
    }
    
    var regex = /^[A-Za-z0-9 ]+$/;
    var isValid = regex.test(name);
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
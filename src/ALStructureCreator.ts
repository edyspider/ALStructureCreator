import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

import { InputBoxOptions } from "vscode";
import { IDisposable } from './disposable.interface';
import { VSCodeWindow } from './vscode.interfaces';
import { ALSCExistError } from './errors/al-sc-exist.error';
import { FolderSettings } from './FolderSettings';

export class ALStructureCreator implements IDisposable {
  constructor(
    private workspaceRoot: string,
    private window: VSCodeWindow
  ) { }
  
  async execute(): Promise<void> {
    this.create();
  }

  async prompt(): Promise<string | undefined> {
    // this can be abstracted out as an argument for prompt
    const options: InputBoxOptions = {
      ignoreFocusOut: true,
      prompt: `AL folder name: 'AlProject', or a relative path: 'AlProject'`,
      placeHolder: 'AlProject',
      validateInput: this.validate
    };

    return await this.window.showInputBox(options);
  }
  
  create() {
    let absoluteALFolderPath = this.toAbsolutePath("");

    try {
      const folders: string[] = FolderSettings.GetProjectFolders();
      const appSubFolders: string[] = FolderSettings.GetAppSubfolders();
      const validateFolder: Boolean = FolderSettings.ValidateFolderBeforeCreate();

      folders.forEach((folder: string) => {
        const foldername = `${folder}`;
        const fullpath = path.join(absoluteALFolderPath, foldername);
        
        if(validateFolder){
          if(!fs.existsSync(fullpath)) {
            fs.mkdirSync(fullpath);
          }
        } else {
          if(fs.existsSync(fullpath)) {
            throw new ALSCExistError(`'${folder}' already exists`);
          }
          fs.mkdirSync(fullpath);
        }

        if (FolderSettings.CreateAppSubfolders()) {
          if(folder===FolderSettings.GetAppFolder()) {
            appSubFolders.forEach((subFolder: string) => {
              const subfoldername = `${subFolder}`;
              const fullsubpath = path.join(fullpath, subfoldername);

              if(validateFolder) {
                if(!fs.existsSync(fullsubpath)) {
                  fs.mkdirSync(fullsubpath);
                }
              }  else {
                if(fs.existsSync(fullsubpath)) {
                  throw new ALSCExistError(`App subfolder '${subFolder}' already exists`);
                }
                fs.mkdirSync(fullsubpath);
              }
            });
          }
        }
      });

      this.window.showInformationMessage(`ALStructureCreator: AL Folder Structure created.`);
    } catch (err) {
      if (err instanceof ALSCExistError) {
        this.window.showErrorMessage(`ALStructureCreator Error: '${err.message}'.`);
      } else {
        this.window.showErrorMessage(`Error: ${err.message}`);
      }
    }
  }

  createFolder(appObjectFolder: string) {
    const appFolder = this.toAbsolutePath(FolderSettings.GetAppFolder());
    const validateFolder: Boolean = FolderSettings.ValidateFolderBeforeCreate();
    let appFullpath = '';

    try {
      if (!fs.existsSync(appFolder)) {
        fs.mkdirSync(appFolder);
      }

      switch(appObjectFolder) {
        case FolderSettings.TableFolder():
          appFullpath = path.join(appFolder, FolderSettings.TableFolder());
          break;
        case FolderSettings.PageFolder():
          appFullpath = path.join(appFolder, FolderSettings.PageFolder());
          break;
        case FolderSettings.ReportFolder():
          appFullpath = path.join(appFolder, FolderSettings.ReportFolder());
          break;
        case FolderSettings.CodeunitFolder():
          appFullpath = path.join(appFolder, FolderSettings.CodeunitFolder());
          break;
        case FolderSettings.QueryFolder():
          appFullpath = path.join(appFolder, FolderSettings.QueryFolder());
          break;
        case FolderSettings.XMLportFolder():
          appFullpath = path.join(appFolder, FolderSettings.XMLportFolder());
          break;
        case FolderSettings.EnumFolder():
          appFullpath = path.join(appFolder, FolderSettings.EnumFolder());
          break;
        case FolderSettings.CtrlAddinFolder():
          appFullpath = path.join(appFolder, FolderSettings.CtrlAddinFolder());
          break;
        case FolderSettings.DotNetFolder():
          appFullpath = path.join(appFolder, FolderSettings.DotNetFolder());
          break;
        default:
          this.window.showErrorMessage(`ALStructureCreator Error: Create application folder invalid.`);
          return;
          break;
      }

      if(validateFolder) {
        if(!fs.existsSync(appFullpath)) {
          fs.mkdirSync(appFullpath);
        }
      } else {
        if(fs.existsSync(appFullpath)) {
          throw new ALSCExistError(`App subfolder '${appObjectFolder}' already exists`);
        }
        fs.mkdirSync(appFullpath);
      }

      this.window.showInformationMessage(`ALStructureCreator: Application/Object folder ` + appObjectFolder + ` successfully created`);
    } catch (err) {
      if (err instanceof ALSCExistError) {
        this.window.showErrorMessage(`ALStructureCreator Error: '${err.message}'.`);
      } else {
        this.window.showErrorMessage(`Error: ${err.message}`);
      }
    }
  }

  reorganizeAppObjects() {
    const rootFolder = this.toAbsolutePath('');
    const appFolder = this.toAbsolutePath(FolderSettings.GetAppFolder());
    const transFolder = this.toAbsolutePath(FolderSettings.TranslationFolder());
    const permFolder = this.toAbsolutePath(FolderSettings.PermissionFolder());

    const tabFolder = path.join(appFolder, FolderSettings.TableFolder());
    const pagFolder = path.join(appFolder, FolderSettings.PageFolder());
    const repFolder = path.join(appFolder, FolderSettings.ReportFolder());
    const codFolder = path.join(appFolder, FolderSettings.CodeunitFolder());
    const queFolder = path.join(appFolder, FolderSettings.QueryFolder());
    const xmlFolder = path.join(appFolder, FolderSettings.XMLportFolder());
    const enuFolder = path.join(appFolder, FolderSettings.EnumFolder());
    const cddFolder = path.join(appFolder, FolderSettings.CtrlAddinFolder());
    const dntFolder = path.join(appFolder, FolderSettings.DotNetFolder());

    const rdlExt = FolderSettings.GetRdlExtension();
    const rdlcExt = FolderSettings.GetRdlcExtension();
    const translExt = FolderSettings.GetTranslationExtension();
    const permFileName = FolderSettings.GetExtPermissionName();

    try {
      let iCountTab: number = 0;
      let iCountPag: number = 0;
      let iCountRep: number = 0;
      let iCountCod: number = 0;
      let iCountQue: number = 0;
      let iCountXml: number = 0;
      let iCountEnu: number = 0;
      let iCountCdd: number = 0;
      let iCountDnt: number = 0;
      let iCountPerm: number = 0;
      let iCountTran: number = 0;
      let iCountTotalt: number = 0;

      fs.readdirSync(rootFolder).forEach(file => {
        console.log(file);
        if(file.slice(-4) === '.xlf') {
          console.log('Translation file: ' + file);
        }

        // AL files
        if((file.indexOf('.') !== 0) && (file.slice(-3) === '.al')) {
          // <--> Table
          if(file.startsWith((FolderSettings.GetAppPrefixTable()))) {
            fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(tabFolder, path.basename(file)));
            iCountTab += 1;
          }
          // <--> Page
          if(file.startsWith((FolderSettings.GetAppPrefixPage()))) {
            fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(pagFolder, path.basename(file)));
            iCountPag += 1;
          }
          // <--> Report
          if(file.startsWith((FolderSettings.GetAppPrefixReport()))) {
            fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(repFolder, path.basename(file)));
            iCountRep += 1;
          }
          // <--> Codeunit
          if(file.startsWith((FolderSettings.GetAppPrefixCodeunit()))) {
            fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(codFolder, path.basename(file)));
            iCountCod += 1;
          }
          // <--> Query
          if(file.startsWith((FolderSettings.GetAppPrefixQuery()))) {
            fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(queFolder, path.basename(file)));
            iCountQue += 1;
          }
          // <--> XMLport
          if(file.startsWith((FolderSettings.GetAppPrefixXMLport()))) {
            fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(xmlFolder, path.basename(file)));
            iCountXml += 1;
          }
          // <--> Enum
          if(file.startsWith((FolderSettings.GetAppPrefixEnum()))) {
            fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(enuFolder, path.basename(file)));
            iCountEnu += 1;
          }
          // <--> Control Addin
          if(file.startsWith((FolderSettings.GetAppPrefixCtrlAddin()))) {
            fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(cddFolder, path.basename(file)));
            iCountCdd += 1;
          }
          // <--> DotNet
          if(file.startsWith((FolderSettings.GetAppPrefixDotNet()))) {
            fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(dntFolder, path.basename(file)));
            iCountDnt += 1;
          }
        }

        // Permission file
        if((file.indexOf('.') !== 0) && (file.match(permFileName))) { // && (file.slice(-4) === '.xml')
          fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(permFolder, path.basename(file)));
          iCountPerm += 1;
        }

        // RDL and RDLC files
        if((file.indexOf('.') !== 0) && ((file.slice(-4) === rdlExt) || (file.slice(-5) === rdlcExt))) {
          fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(repFolder, path.basename(file)));
          iCountRep += 1;
        }

        // Translation files
        if((file.indexOf('.') !== 0) && (file.slice(-4) === translExt)) {
          fs.renameSync(path.join(rootFolder, path.basename(file)),path.join(transFolder, path.basename(file)));
          iCountTran += 1;
        }
      });

      iCountTotalt=iCountTab+iCountPag+iCountRep+iCountCod+iCountQue+iCountXml+iCountEnu+iCountCdd+iCountDnt+iCountPerm+iCountTran;

      this.window.showInformationMessage(`ALStructureCreator: Reorganization finished. Total moved files: `+iCountTotalt);
    } catch (err) {
      if (err instanceof ALSCExistError) {
        this.window.showErrorMessage(`ALStructureCreator Error: '${err.message}'.`);
      } else {
        this.window.showErrorMessage(`Error: ${err.message}`);
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
      console.log('disposing...');
  }

}
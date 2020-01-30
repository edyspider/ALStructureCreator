import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

import { InputBoxOptions } from "vscode";
import { IDisposable } from './disposable.interface';
import { VSCodeWindow } from './vscode.interfaces';
import { ALProjectFolderExistError } from './errors/al-project-folder-exist.error';

export class ALStructureCreator implements IDisposable {
  private readonly objectFolder = ['App', 'Images', 'Logo', 'Permissions', 'Rules', 'Tests', 'Translations', 'WebServices'];
  private readonly appSubFolderNum = ['01_Table', '02_Page', '03_Report', '04_Codeunit', '05_Query', '06_XMLport', '07_Enum', '08_ControllAddin', '99_DotNet'];
  private readonly appSubFolderTxt = ['Table', 'Page', 'Report', 'Codeunit', 'Query', 'XMLport', 'Enum', 'ControllAddin', 'DotNet'];
  private readonly extObjSuffix = ['Cust', 'Ext'];
  private readonly defaultPath = '';

  constructor(
    private workspaceRoot: string,
    private window: VSCodeWindow
  ) { }
  
  async execute(): Promise<void> {
    const projectFolder = vscode.workspace.getConfiguration().get('ALStructureCreator.ProjectFolderOption');
    const createInRoot: boolean = (projectFolder==="Root");

    if(!createInRoot) {
      // prompt for the name of the master AL folder, or the path to create the AL folder structure in
      const alfolder: string | undefined = await this.prompt();

      if (!alfolder) {
        return;
      }

      const absoluteALPath: string = this.toAbsolutePath(alfolder);

      try {
        this.create(absoluteALPath,createInRoot);
        
        this.window.showInformationMessage(`ALFolderStructure: successfully created`);
      } catch (err) {     
        // log?
        if (err instanceof ALProjectFolderExistError) {
          this.window.showErrorMessage(`ALFolderStructure: '${alfolder}' already exists`);
        } else {
          this.window.showErrorMessage(`Error: ${err.message}`);
        }
      }
    } else  {
      try {
        this.create("",createInRoot);

        this.window.showInformationMessage(`ALFolderStructure: successfully created`);
      } catch (err) {
        this.window.showErrorMessage(`Error: ${err.message}`);
      }
    }
    
  }

  async prompt(): Promise<string | undefined> {
    // this can be abstracted out as an argument for prompt
    const options: InputBoxOptions = {
      ignoreFocusOut: true,
      //prompt: `AL folder name: 'some_al', or a relative path: 'src/state/project/some_al'`,
      prompt: `AL folder name: 'AlProject', or a relative path: 'AlProject'`,
      placeHolder: 'AlProject',
      validateInput: this.validate
    };

    return await this.window.showInputBox(options);
  }
  
  create(absoluteALFolderPath: string, createInRoot: boolean) {
    if(!createInRoot) {
      if (fs.existsSync(absoluteALFolderPath)) {
        const alfolder: string = path.basename(absoluteALFolderPath);
        const errorOnExistFolder = vscode.workspace.getConfiguration().get('ALStructureCreator.ErrorOnExistFolder');

        if(errorOnExistFolder===true) {
          throw new ALProjectFolderExistError(`'${alfolder}' already exists`);
        }
      } else {
        // create the directory
        fs.mkdirSync(absoluteALFolderPath);
      }
    } else {
      absoluteALFolderPath = this.toAbsolutePath("");
    }

    try {      
      this.objectFolder.forEach((folder: string) => {
        const foldername = `${folder}`;
        const fullpath = path.join(absoluteALFolderPath, foldername);

        // Create Files
        //fs.writeFileSync(fullpath, `/* ${filename} */`);
        
        fs.mkdirSync(fullpath);

        if(foldername==='App') {
          const createExtSubFolder = vscode.workspace.getConfiguration().get('ALStructureCreator.CreateExtObjFolder');
          let fullSubPath: string = "";
          
          switch(vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) { 
            case "Numbered": { 
              this.appSubFolderNum.forEach((subFile: string) => {
                const subFolderName = `${subFile}`;
                fullSubPath = path.join(fullpath, subFolderName);
  
                fs.mkdirSync(fullSubPath);
  
                if(createExtSubFolder===true) {
                  this.extObjSuffix.forEach((extFile: string) => {
                    const extFolderName = `${extFile}`;
                    fs.mkdirSync(fullSubPath+extFolderName);
                  });
                }
              });
               break; 
            } 
            case "Named": { 
              this.appSubFolderTxt.forEach((subFile: string) => {
                const subFolderName = `${subFile}`;
                fullSubPath = path.join(fullpath, subFolderName);
  
                fs.mkdirSync(fullSubPath);
  
                if(createExtSubFolder===true) {
                  this.extObjSuffix.forEach((extFile: string) => {
                    const extFolderName = `${extFile}`;
                    fs.mkdirSync(fullSubPath+extFolderName);
                  });
                }
              });
               break; 
            } 
            default: { 
               //statements; 
               break; 
            } 
         }
        }
      });
    } catch (err) {
      // log other than console?
      console.log('Error', err.message);

      throw err;
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
      return path.resolve(this.workspaceRoot, this.defaultPath, nameOrRelativePath);
  }

  dispose(): void {
      console.log('disposing...');
  }

}
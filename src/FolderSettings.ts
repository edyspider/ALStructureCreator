import * as vscode from 'vscode';

export class FolderSettings {
    private static projectFolder = ['App', 'Images', 'Logo', 'Permissions', 'Rules', 'Tests', 'Translations', 'WebServices'];
    private static appSubFolderNum = ['01_Table', '02_Page', '03_Report', '04_Codeunit', '05_Query', '06_XMLport', '07_Enum', '08_ControllAddin', '99_DotNet'];
    private static appSubFolderTxt = ['Table', 'Page', 'Report', 'Codeunit', 'Query', 'XMLport', 'Enum', 'ControllAddin', 'DotNet'];

    private static translationExt = '.xlf';
    private static reportOldExt = '.rdl';
    private static reportNewExt = '.rdlc';
    private static extPermissionName = 'extensionsPermissionSet';


    private static propAppFolderNamed = 'Named';
    private static propAppFolderNumbered = 'Numbered';
    private static propAppFolderNone = 'None';
    private static propExtFolderCust = 'Cust';
    private static propExtFolderExt = 'Ext';
    private static propLayoutSubFolder = 'Layout';

    private static translationFolder = 'Translations';
    private static permissionFolder = 'Permissions';

    private static objPrefixTable = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectPrefix.Table');
    private static objPrefixPage = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectPrefix.Page');
    private static objPrefixReport = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectPrefix.Report');
    private static objPrefixCodeunit = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectPrefix.Codeunit');
    private static objPrefixQuery = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectPrefix.Query');
    private static objPrefixXMLport = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectPrefix.XMLport');
    private static objPrefixEnum = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectPrefix.Enum');
    private static objPrefixCtrlAddin = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectPrefix.ControlAddin');
    private static objPrefixDotNet = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectPrefix.DotNet');

    private static AppFolder = 'App';

    private static AppTableNamed = 'Table';
    private static AppTableNumbered = '01_Table';
    private static AppPageNamed = 'Page';
    private static AppPageNumbered = '02_Page';
    private static AppReportNamed = 'Report';
    private static AppReportNumbered = '03_Report';
    private static AppCodeunitNamed = 'Codeunit';
    private static AppCodeunitNumbered = '04_Codeunit';
    private static AppQueryNamed = 'Query';
    private static AppQueryNumbered = '05_Query';
    private static AppXMLportNamed = 'XMLport';
    private static AppXMLportNumbered = '06_XMLport';
    private static AppEnumNamed = 'Enum';
    private static AppEnumNumbered = '07_Enum';
    private static AppCtrlAddInNamed = 'ControllAddin';
    private static AppCtrlAddInNumbered = '08_ControllAddin';
    private static AppDotNetNamed = 'DotNet';
    private static AppDotNetNumbered = '99_DotNet';

    public static CreateAppSubfolders(): Boolean {
        return Boolean(
            vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType') !== this.propAppFolderNone
            );
    }

    public static CreateLayoutSubfolder(): Boolean {
        return Boolean(
            vscode.workspace.getConfiguration().get('ALStructureCreator.CreateReportLayoutFolder') === true
            );
    }

    public static ValidateFolderBeforeCreate(): Boolean {
        return Boolean(
            vscode.workspace.getConfiguration().get('ALStructureCreator.ErrorOnExistFolder') === false
            );
    }

    public static GetProjectFolders(): string[] {
        return this.projectFolder;
    }

    public static GetAppSubfolderNum(): string[] {
        return this.appSubFolderNum;
    }

    public static GetAppSubfolderTxt(): string[] {
        return this.appSubFolderTxt;
    }

    public static GetAppSubfolders(): string[] {
        let arraySubFolders: string[];
        switch(vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) { 
            case "Numbered":
                arraySubFolders = this.SetExtensionSubFolders(this.appSubFolderNum);
                break;
            case "Named":
                arraySubFolders = this.SetExtensionSubFolders(this.appSubFolderTxt);
                break;
            default:
                arraySubFolders = [''];
                break;
         }
        return arraySubFolders;
    }

    private static SetExtensionSubFolders(subFolders: string[]): string[] {
        const createExtSubFolder = vscode.workspace.getConfiguration().get('ALStructureCreator.CreateExtObjFolder');

        switch(createExtSubFolder) {
            case 'Cust':
                subFolders.forEach((subFolder: string) => {
                    subFolders.push(subFolder+'Cust');
                });
              break;
            case 'Ext':
                subFolders.forEach((subFolder: string) => {
                    subFolders.push(subFolder+'Ext');
                });
              break;
            case 'Both':
                subFolders.forEach((subFolder: string) => {
                    subFolders.push(subFolder+'Cust');
                });
                subFolders.forEach((subFolder: string) => {
                    subFolders.push(subFolder+'Ext');
                });
              break;
          }
          return subFolders;
    }

    public static GetRdlExtension(): string {
        return String(this.reportOldExt);
    }

    public static GetRdlcExtension(): string {
        return String(this.reportNewExt);
    }

    public static GetTranslationExtension(): string {
        return String(this.translationExt);
    }

    public static GetExtPermissionName(): string {
        return String(this.extPermissionName);
    }

    public static GetAppFolder() {
        return this.AppFolder;
    }

    public static GetAppPrefixObjCust(obj: string): string {
        return String(obj+this.propExtFolderCust);
    }

    public static GetAppPrefixObjCust2(obj: string): string {
        return String(obj+'-'+this.propExtFolderCust);
    }

    public static GetAppPrefixObjExt(obj: string): string {
        return String(obj+this.propExtFolderExt);
    }

    public static GetAppPrefixObjExt2(obj: string): string {
        return String(obj+'-'+this.propExtFolderExt);
    }

    public static GetAppPrefixTable(): string {
        return String(this.objPrefixTable);
    }

    public static GetAppPrefixPage(): string {
        return String(this.objPrefixPage);
    }

    public static GetAppPrefixReport(): string {
        return String(this.objPrefixReport);
    }

    public static GetAppPrefixCodeunit(): string {
        return String(this.objPrefixCodeunit);
    }

    public static GetAppPrefixQuery(): string {
        return String(this.objPrefixQuery);
    }

    public static GetAppPrefixXMLport(): string {
        return String(this.objPrefixXMLport);
    }

    public static GetAppPrefixEnum(): string {
        return String(this.objPrefixEnum);
    }

    public static GetAppPrefixCtrlAddin(): string {
        return String(this.objPrefixCtrlAddin);
    }

    public static GetAppPrefixDotNet(): string {
        return String(this.objPrefixDotNet);
    }

    public static TableFolder() {
        switch(vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
            case this.propAppFolderNamed:
                return this.AppTableNamed;
                break;
            case this.propAppFolderNumbered:
                return this.AppTableNumbered;
                break;
            default:
                return '';
                break;
        }
    }

    public static PageFolder() {
        switch(vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
            case this.propAppFolderNamed:
                return this.AppPageNamed;
                break;
            case this.propAppFolderNumbered:
                return this.AppPageNumbered;
                break;
            default:
                return '';
                break;
        }
    }

    public static ReportFolder() {
        switch(vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
            case this.propAppFolderNamed:
                return this.AppReportNamed;
                break;
            case this.propAppFolderNumbered:
                return this.AppReportNumbered;
                break;
            default:
                return '';
                break;
        }
    }
    
    public static ReportLayoutFolder() {
        return this.propLayoutSubFolder;
    }

    public static CodeunitFolder() {
        switch(vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
            case this.propAppFolderNamed:
                return this.AppCodeunitNamed;
                break;
            case this.propAppFolderNumbered:
                return this.AppCodeunitNumbered;
                break;
            default:
                return '';
                break;
        }
    }

    public static QueryFolder() {
        switch(vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
            case this.propAppFolderNamed:
                return this.AppQueryNamed;
                break;
            case this.propAppFolderNumbered:
                return this.AppQueryNumbered;
                break;
            default:
                return '';
                break;
        }
    }

    public static XMLportFolder() {
        switch(vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
            case this.propAppFolderNamed:
                return this.AppXMLportNamed;
                break;
            case this.propAppFolderNumbered:
                return this.AppXMLportNumbered;
                break;
            default:
                return '';
                break;
        }
    }

    public static EnumFolder() {
        switch(vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
            case this.propAppFolderNamed:
                return this.AppEnumNamed;
                break;
            case this.propAppFolderNumbered:
                return this.AppEnumNumbered;
                break;
            default:
                return '';
                break;
        }
    }

    public static CtrlAddinFolder() {
        switch(vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
            case this.propAppFolderNamed:
                return this.AppCtrlAddInNamed;
                break;
            case this.propAppFolderNumbered:
                return this.AppCtrlAddInNumbered;
                break;
            default:
                return '';
                break;
        }
    }

    public static DotNetFolder() {
        switch(vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
            case this.propAppFolderNamed:
                return this.AppDotNetNamed;
                break;
            case this.propAppFolderNumbered:
                return this.AppDotNetNumbered;
                break;
            default:
                return '';
                break;
        }
    }

    public static TranslationFolder(): string {
        return String(this.translationFolder);
    }

    public static PermissionFolder(): string {
        return String(this.permissionFolder);
    }
}
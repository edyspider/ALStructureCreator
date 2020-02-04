"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class FolderSettings {
    static GetAppFolder() {
        return this.AppFolder;
    }
    static Table() {
        switch (vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
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
    static Page() {
        switch (vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
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
    static Report() {
        switch (vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
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
    static Codeunit() {
        switch (vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
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
    static Query() {
        switch (vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
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
    static XMLport() {
        switch (vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
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
    static Enum() {
        switch (vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
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
    static CtrlAddin() {
        switch (vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
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
    static DotNet() {
        switch (vscode.workspace.getConfiguration().get('ALStructureCreator.AppSubfolderType')) {
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
}
exports.FolderSettings = FolderSettings;
FolderSettings.propAppFolderNamed = 'Named';
FolderSettings.propAppFolderNumbered = 'Numbered';
FolderSettings.propExtFolderCust = 'Cust';
FolderSettings.propExtFolderExt = 'Ext';
FolderSettings.propProjectFolderRoot = 'Root';
FolderSettings.propProjectFolderNew = 'NewFolder';
FolderSettings.AppFolder = 'App';
FolderSettings.AppTableNamed = 'Table';
FolderSettings.AppTableNumbered = '01_Table';
FolderSettings.AppPageNamed = 'Page';
FolderSettings.AppPageNumbered = '02_Page';
FolderSettings.AppReportNamed = 'Report';
FolderSettings.AppReportNumbered = '03_Report';
FolderSettings.AppCodeunitNamed = 'Codeunit';
FolderSettings.AppCodeunitNumbered = '04_Codeunit';
FolderSettings.AppQueryNamed = 'Query';
FolderSettings.AppQueryNumbered = '05_Query';
FolderSettings.AppXMLportNamed = 'XMLport';
FolderSettings.AppXMLportNumbered = '06_XMLport';
FolderSettings.AppEnumNamed = 'Enum';
FolderSettings.AppEnumNumbered = '07_Enum';
FolderSettings.AppCtrlAddInNamed = 'ControllAddin';
FolderSettings.AppCtrlAddInNumbered = '08_ControllAddin';
FolderSettings.AppDotNetNamed = 'DotNet';
FolderSettings.AppDotNetNumbered = '99_DotNet';
//# sourceMappingURL=FolderSettings.js.map
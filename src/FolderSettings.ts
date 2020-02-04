import * as vscode from 'vscode';

export class FolderSettings {
    private static propAppFolderNamed = 'Named';
    private static propAppFolderNumbered = 'Numbered';
    private static propExtFolderCust = 'Cust';
    private static propExtFolderExt = 'Ext';
    private static propProjectFolderRoot = 'Root';
    private static propProjectFolderNew = 'NewFolder';

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

    public static GetAppFolder() {
        return this.AppFolder;
    }

    public static Table() {
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

    public static Page() {
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

    public static Report() {
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

    public static Codeunit() {
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

    public static Query() {
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

    public static XMLport() {
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

    public static Enum() {
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

    public static CtrlAddin() {
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

    public static DotNet() {
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
}
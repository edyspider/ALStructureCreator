import * as vscode from 'vscode';
import { StructureProperties } from './structure.interface';
import { FileExtensions } from './structure.interface';
import { FolderProperties } from './structure.interface';
import { ObjectIdent } from './structure.interface';

export class StructureSettings {
    private static folderPropCreate = 'autocreate';
    private static folderPropCust = 'createcust';
    private static folderPropName = 'name';
    private static folderPropSubFolder = 'subfolder';
    private static rootEnumLogo = "logo";
    private static rootEnumObject = "object";
    private static rootEnumTranslation = "translation";
    private static rootEnumWebService = "webservice";
    private static objEnumCodeUnit = "codeunit";
    private static objEnumControlAddin = "controladdin";
    private static objEnumDotNet = "dotnet";
    private static objEnumEntitlement = "entitlement";
    private static objEnumEnum = "enum";
    private static objEnumEnumExt = "enumExt";
    private static objEnumInterface = "interface";
    private static objEnumLayout = "layout";
    private static objEnumPage = "page";
    private static objEnumPageExt = "pageExt";
    private static objEnumPermissionSet = "permissionset";
    private static objEnumPermissionSetExt = "permissionsetExt";
    private static objEnumProfile = "profile";
    private static objEnumQuery = "query";
    private static objEnumReport = "report";
    private static objEnumReportExt = "reportExt";
    private static objEnumTable = "table";
    private static objEnumTableExt = "tableExt";
    private static objEnumXmlPort = "xmlport";

    private static structureRootPath = 'ALStructureCreator.FolderStructure.structure';

    private static fileExtAl = 'al';
    private static fileExtDocx = 'docx';
    private static fileExtGif = 'gif';
    private static fileExtIcon = 'icon';
    private static fileExtJpg = 'jpg';
    private static fileExtPng = 'png';
    private static fileExtRdl = 'rdl';
    private static fileExtRdlc = 'rdlc';
    private static fileExtXlf = 'xlf';
    private static fileExtXlsx = 'xlsx';
    private static fileExtXml = 'xml';
    
    private static translationExt = '.xlf';
    private static reportOldExt = '.rdl';
    private static reportNewExt = '.rdlc';
    private static extPermissionName = 'extensionsPermissionSet';

    private static objIdentification = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdentification');
    private static objIdentMaxReadLine = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.MaxReadLine');
    private static objIdentCodeUnit = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Codeunit');
    private static objIdentControlAddin = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.ControlAddin');
    private static objIdentDotNet = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.DotNet');
    private static objIdentEntitlement = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Entitlement');
    private static objIdentEnum = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Enum');
    private static objIdentEnumExt = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.EnumExt');
    private static objIdentInterface = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Interface');
    private static objIdentPage = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Page');
    private static objIdentPageExt = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.PageExt');
    private static objIdentPermissionSet = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.PermissionSet');
    private static objIdentPermissionSetExt = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.PermissionSetExt');
    private static objIdentProfile = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Profile');
    private static objIdentQuery = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Query');
    private static objIdentReport = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Report');
    private static objIdentReportExt = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.ReportExt');
    private static objIdentTable = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Table');
    private static objIdentTableExt = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.TableExt');
    private static objIdentXmlPort = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.XmlPort');

    public static ValidateFolderBeforeCreate(): Boolean {
        return Boolean(false);
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

    public static GetStructureRootPath(): string {
        return this.structureRootPath;
    }

    public static GetObjIdentification(): string {
        return String(this.objIdentification);
    }

    public static GetObjectMaxReadLine(): number {
        return Number(this.objIdentMaxReadLine);
    }

    public static GetFileExtensions() : FileExtensions {
        let fileExt = {
            al: this.fileExtAl,
            docx: this.fileExtDocx,
            gif: this.fileExtGif,
            icon: this.fileExtIcon,
            jpg: this.fileExtJpg,
            png: this.fileExtPng,
            rdl: this.fileExtRdl,
            rdlc: this.fileExtRdlc,
            xlf: this.fileExtXlf,
            xlsx: this.fileExtXlsx,
            xml: this.fileExtXml
        };

        let extensions: FileExtensions = new FileExtensions(fileExt);

        return extensions;
    }

    public static GetFolderProperties() : FolderProperties {
        let attr = {
            create: this.folderPropCreate,
            cust: this.folderPropCust,
            name: this.folderPropName,
            subfolder: this.folderPropSubFolder
        };

        let attributes: FolderProperties = new FolderProperties(attr);

        return attributes;
    }

    public static GetObjectsIdent() : ObjectIdent {
        let objects = {
            codeUnit: <string>this.objIdentCodeUnit,
            controlAddin: <string>this.objIdentControlAddin,
            dotNet: <string>this.objIdentDotNet,
            entitlement: <string>this.objIdentEntitlement,
            enum: <string>this.objIdentEnum,
            enumExt: <string>this.objIdentEnumExt,
            interface: <string>this.objIdentInterface,
            page: <string>this.objIdentPage,
            pageExt: <string>this.objIdentPageExt,
            permissionSet: <string>this.objIdentPermissionSet,
            permissionSetExt: <string>this.objIdentPermissionSetExt,
            profile: <string>this.objIdentProfile,
            query: <string>this.objIdentQuery,
            report: <string>this.objIdentReport,
            reportExt: <string>this.objIdentReportExt,
            table: <string>this.objIdentTable,
            tableExt: <string>this.objIdentTableExt,
            xmlPort: <string>this.objIdentXmlPort
        };

        let idents: ObjectIdent = new ObjectIdent(objects);

        return idents;
    }

    public static GetStructureProperties() : StructureProperties {
        let folder = {
            create: this.folderPropCreate,
            cust: this.folderPropCust,
            name: this.folderPropName,
            subfolder: this.folderPropSubFolder
        };
        let roots = {
            logo: this.rootEnumLogo,
            object: this.rootEnumObject,
            translation: this.rootEnumTranslation,
            webService: this.rootEnumWebService
        };
        let objects = {
            codeUnit: this.objEnumCodeUnit,
            controlAddin: this.objEnumControlAddin,
            dotNet: this.objEnumDotNet,
            entitlement: this.objEnumEntitlement,
            enum: this.objEnumEnum,
            enumExt: this.objEnumEnumExt,
            interface: this.objEnumInterface,
            layout: this.objEnumLayout,
            page: this.objEnumPage,
            pageExt: this.objEnumPageExt,
            permissionSet: this.objEnumPermissionSet,
            permissionSetExt: this.objEnumPermissionSetExt,
            profile: this.objEnumProfile,
            query: this.objEnumQuery,
            report: this.objEnumReport,
            reportExt: this.objEnumReportExt,
            table: this.objEnumTable,
            tableExt: this.objEnumTableExt,
            xmlPort: this.objEnumXmlPort
        };

        let properties: StructureProperties = new StructureProperties(folder, roots, objects);

        return properties;
    }
}

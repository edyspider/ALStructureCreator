import * as vscode from 'vscode';
import { StructureProperties } from './structure.interface';
import { FileExtentions } from './structure.interface';
import { FolderProperties } from './structure.interface';
import { ObjectIdent } from './structure.interface';

export class StructureSettings {
    private static folderPropCreate = 'autocreate';
    private static folderPropName = 'name';
    private static folderPropSubFolder = 'subfolder';
    private static rootEnumLogo = "logo";
    private static rootEnumObject = "object";
    private static rootEnumPermission = "permission";
    private static rootEnumTest = "test";
    private static rootEnumTranslation = "translation";
    private static rootEnumWebservice = "webservice";
    private static objEnumCodeunit = "codeunit";
    private static objEnumControladdin = "controladdin";
    private static objEnumDotnet = "dotnet";
    private static objEnumEntitlement = "entitlement";
    private static objEnumEnum = "enum";
    private static objEnumInterface = "interface";
    private static objEnumLayout = "layout";
    private static objEnumPage = "page";
    private static objEnumPermissionset = "permissionset";
    private static objEnumProfile = "profile";
    private static objEnumQuery = "query";
    private static objEnumReport = "report";
    private static objEnumRequestpage = "requestpage";
    private static objEnumTable = "table";
    private static objEnumXmlport = "xmlport";

    private static structureRootPath = 'ALStructureCreator.FoldertStructure.structure';

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
    private static objIdentCodeunit = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Codeunit');
    private static objIdentControlAddin = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.ControlAddin');
    private static objIdentDotNet = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.DotNet');
    private static objIdentEntitlement = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Entitlement');
    private static objIdentEnum = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Enum');
    private static objIdentInterface = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Interface');
    private static objIdentPage = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Page');
    private static objIdentPermissionSet = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.PermissionSet');
    private static objIdentProfile = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Profile');
    private static objIdentQuery = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Query');
    private static objIdentReport = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Report');
    private static objIdentRequestPage = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.RequestPage');
    private static objIdentTable = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.Table');
    private static objIdentXmlPort = vscode.workspace.getConfiguration().get('ALStructureCreator.ObjectIdent.XmlPort');

    public static ValidateFolderBeforeCreate(): Boolean {
        return Boolean(
            false
            );
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

    public static GetobjIdentification(): string {
        return String(this.objIdentification);
    }

    public static GetFileExtensions() : FileExtentions {
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

        let extensions: FileExtentions = new FileExtentions(fileExt);

        return extensions;
    }

    public static GetFolderProperties() : FolderProperties {
        let attr = {
            create: this.folderPropCreate,
            name: this.folderPropName,
            subfolder: this.folderPropSubFolder
        };

        let attributes: FolderProperties = new FolderProperties(attr);

        return attributes;
    }

    public static GetObjectsIdent() : ObjectIdent {
        let objects = {
            codeunit: <string>this.objIdentCodeunit,
            controladdin: <string>this.objIdentControlAddin,
            dotnet: <string>this.objIdentDotNet,
            entitlement: <string>this.objIdentEntitlement,
            enum: <string>this.objIdentEnum,
            interface: <string>this.objIdentInterface,
            page: <string>this.objIdentPage,
            permissionset: <string>this.objIdentPermissionSet,
            profile: <string>this.objIdentProfile,
            query: <string>this.objIdentQuery,
            report: <string>this.objIdentReport,
            requestpage: <string>this.objIdentRequestPage,
            table: <string>this.objIdentTable,
            xmlport: <string>this.objIdentXmlPort
        };

        let idents: ObjectIdent = new ObjectIdent(objects);

        return idents;
    }

    public static GetStructureProperties() : StructureProperties {
        let folder = {
            create: this.folderPropCreate,
            name: this.folderPropName,
            subfolder: this.folderPropSubFolder
        };
        let roots = {
            logo: this.rootEnumLogo,
            object: this.rootEnumObject,
            permission: this.rootEnumPermission,
            test: this.rootEnumTest,
            translation: this.rootEnumTranslation,
            webservice: this.rootEnumWebservice
        };
        let objects = {
            codeunit: this.objEnumCodeunit,
            controladdin: this.objEnumControladdin,
            dotnet: this.objEnumDotnet,
            entitlement: this.objEnumEntitlement,
            enum: this.objEnumEnum,
            interface: this.objEnumInterface,
            layout: this.objEnumLayout,
            page: this.objEnumPage,
            permissionset: this.objEnumPermissionset,
            profile: this.objEnumProfile,
            query: this.objEnumQuery,
            report: this.objEnumReport,
            requestpage: this.objEnumRequestpage,
            table: this.objEnumTable,
            xmlport: this.objEnumXmlport
        };

        let properties: StructureProperties = new StructureProperties(folder, roots, objects);

        return properties;
    }
}

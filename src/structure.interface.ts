type ASCFileExtensions = {
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
};

type ASCFolderProperties = {
    create: string;
    cust: string;
    name: string;
    subfolder: string;
};

interface ASCRootFolders {
    logo: string;
    object: string;
    translation: string;
    webService: string;
}

interface ASCObjectFolders {
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
    layout: string;
    table: string;
    tableExt: string;
    xmlPort: string;
}

interface ASCObjectIdent {
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

export class StructureProperties {
    private folderProp: ASCFolderProperties;
    private rootFolders: ASCRootFolders;
    private objectFolders: ASCObjectFolders;

    constructor(propFolder: ASCFolderProperties, foldersRoot: ASCRootFolders, foldersObject: ASCObjectFolders) {
        this.folderProp = propFolder;
        this.rootFolders = foldersRoot;
        this.objectFolders = foldersObject;
    }

    public getFolderProperties() {
        return this.folderProp;
    }

    public getRootFolders() {
        return this.rootFolders;
    }

    public getObjectFolders() {
        return this.objectFolders;
    }
}

export class FileExtensions {
    private fileExtList: ASCFileExtensions;

    constructor(extFile: ASCFileExtensions) {
        this.fileExtList = extFile;
    }

    public getFileExtensions() {
        return this.fileExtList;
    }
}

export class FolderProperties {
    private folderProp: ASCFolderProperties;

    constructor(propFolder: ASCFolderProperties) {
        this.folderProp = propFolder;
    }

    public getFolderProperties() {
        return this.folderProp;
    }
}

export class RootFolders {
    private rootFolders: ASCRootFolders;

    constructor(folders: ASCRootFolders) {
        this.rootFolders = folders;
    }

    public getRootFolders() {
        return this.rootFolders;
    }
}

export class ObjectFolders {
    private objectFolders: ASCObjectFolders;

    constructor(folders: ASCObjectFolders) {
        this.objectFolders = folders;
    }

    public getObjectEnum() {
        return this.objectFolders;
    }
}

export class ObjectIdent {
    private objectIdents: ASCObjectIdent;

    constructor(folders: ASCObjectIdent) {
        this.objectIdents = folders;
    }

    public getObjectIdents() {
        return this.objectIdents;
    }
}
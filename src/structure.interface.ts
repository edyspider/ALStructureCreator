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
    ext: string;
    name: string;
    subfolder: string;
};

interface ASCRootFolders {
    logo: string;
    object: string;
    test: string;
    translation: string;
    webservice: string;
}

interface ASCObjectFolders {
    codeunit: string;
    controladdin: string;
    dotnet: string;
    entitlement: string;
    enum: string;
    interface: string;
    page: string;
    permissionset: string;
    profile: string;
    query: string;
    report: string;
    layout: string;
    table: string;
    xmlport: string;
}

interface ASCObjectIdent {
    codeunit: string;
    controladdin: string;
    dotnet: string;
    entitlement: string;
    enum: string;
    interface: string;
    page: string;
    permissionset: string;
    profile: string;
    query: string;
    report: string;
    table: string;
    xmlport: string;
}

export class StructureProperties {
    private folderProp: ASCFolderProperties;
    private rootEnum: ASCRootFolders;
    private objectEnum: ASCObjectFolders;

    constructor(propFolder: ASCFolderProperties, foldersRoot: ASCRootFolders, foldersObject: ASCObjectFolders) {
        this.folderProp = propFolder;
        this.rootEnum = foldersRoot;
        this.objectEnum = foldersObject;
    }

    public getFolderProperties() {
        return this.folderProp;
    }

    public getRootEnum() {
        return this.rootEnum;
    }

    public getObjectEnum() {
        return this.objectEnum;
    }
}

export class FileExtentions {
    private fileExt: ASCFileExtensions;

    constructor(extFile: ASCFileExtensions) {
        this.fileExt = extFile;
    }

    public getFileExtensons() {
        return this.fileExt;
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
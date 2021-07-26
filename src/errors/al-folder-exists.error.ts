export class ALFolderExistsError extends Error {
    constructor(message: string = 'AL folder already exists') {
      super(message);
  
      this.name = 'ALFolderExistsError';
    }
  }
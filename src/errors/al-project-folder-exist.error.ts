export class ALProjectFolderExistError extends Error {
    constructor(message: string = 'AL project folder already exists') {
      super(message);
  
      this.name = 'ALProjectFolderExistError';
    }
  }
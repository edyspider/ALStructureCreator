export class ALSCExistError extends Error {
    constructor(message: string = 'AL folder already exists') {
      super(message);
  
      this.name = 'ALSCExistError';
    }
  }
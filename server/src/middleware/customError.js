
export class customError extends Error{
    constructor(message, statusCode, errorType = "GeneralError", details = null) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.errorType = errorType; 
        this.details = details; // Extra information about the error
      }
}


const errorHandler = (err, req, res, next) => {
    console.log(err,"err")
    const statusCode = err.statusCode || 500; // Default to 500 if no statusCode is set.
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      success: false,
      status: statusCode,
      error: {
        type: err.errorType || "ServerError",
        message,
        details: err.details,
      },
    });
  };
  
  export default errorHandler;
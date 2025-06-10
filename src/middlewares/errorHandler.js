// errorHandler.js

function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log full error stack for debugging

  const statusCode = err.statusCode || 500; // Default to 500 if not set
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}

export default errorHandler;

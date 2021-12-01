const RequestError = require('../shared/errors/RequestError');

function ErrorHandler(error, req, res, next) {
  console.log(error);

  if (error instanceof RequestError) {
    const statusCode = error.code;

    res.status(statusCode ?? 500).json({
      success: false,
      message: error.message,
    });

    return;
  }

  res.status(500).json({
    success: false,
    debugData: {
      message: error.message,
    },
  });
}

module.exports = ErrorHandler;

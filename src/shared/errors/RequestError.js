class RequestError extends Error {
  constructor(message, code) {
    super(message);

    this.code = code;
  }

  getStatusCode() {
    return this.code;
  }
}

module.exports = RequestError;

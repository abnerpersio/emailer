class RequestError extends Error {
  code;

  constructor(message: string, code: number) {
    super(message);

    this.code = code;
  }

  getStatusCode() {
    return this.code;
  }
}

export default RequestError;

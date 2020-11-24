export class ApiError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
    this.message = message
    this.status = 400
    this.statusCode = 400
  }
}

export default ApiError

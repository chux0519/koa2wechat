class HTTPException {

  constructor(type) {
    this.error = true
  }

  get status() { return this._status }
  set status(status) { this._status = status }

  get message() { return this._message }
  set message(message) { this._message = message }

}

class Unauthorized extends HTTPException {
  constructor(message) {
    super()
    this.type = "Unauthorized"
    this.message = message
    this.status = 401
  }
}

class ImplementError extends HTTPException {
  constructor(message) {
    super()
    this.type = "Not implemented"
    this.message = message
    this.status = 501
  }
}



export let Exceptions = {
  Unauthorized,
  ImplementError
}

export function ExceptionHandler(exception) {
  if (exception instanceof HTTPException)
    return { ok: false, error: true, message: exception.message, status: exception.status, type: exception.type }
  throw exception
}
class WeException {

  constructor(message) {
  	this.error = true
    this.type = "Internal Server Error";
    this.message = message;
    this.status = 500;
  }

}


export let Exception = WeException

export function ExceptionHandler(exception) {
  if (exception instanceof WeException)
    return { ok: false, error: true, message: exception.message, status: exception.status, type: exception.type };
  throw exception;
}
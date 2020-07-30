export class UnexpectedError extends Error {
  constructor (service: string) {
    super(`Unexpected error in ${service}`)
    this.name = 'UnexpectedError'
  }
}

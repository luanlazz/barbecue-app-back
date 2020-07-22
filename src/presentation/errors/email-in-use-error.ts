export class EmailInUseError extends Error {
  constructor () {
    super('This email has been in use')
    this.name = 'EmailInUseError'
  }
}

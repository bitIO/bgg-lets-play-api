export class DatabaseError extends Error {
  constructor(code: string, message?: string) {
    super(message);
    this.code = code;
  }

  protected code: string;
}

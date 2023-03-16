//Should be a different name honesly. Please bear with it.
export class ProductError {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}

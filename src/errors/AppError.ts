class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message = 'Não foi possivel realizar a ação', statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;

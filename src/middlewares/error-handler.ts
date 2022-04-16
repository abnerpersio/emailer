import { NextFunction, Request, Response } from 'express';
import RequestError from '../shared/errors/RequestError';

export function ErrorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
  const { code: statusCode = 500 } = error as RequestError;

  res.status(statusCode ?? 500).json({
    success: false,
    message: error.message,
  });
}

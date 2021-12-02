import { NextFunction, Request, Response } from "express";
import RequestError from '../shared/errors/RequestError';

export default function ErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  console.log(error);

  if (error instanceof RequestError) {
    const statusCode = error.code;

    res.status(statusCode ?? 500).json({
      success: false,
      message: error.message,
    });

    return;
  }

  res.status(500).json({
    success: false,
    debugData: {
      message: error.message,
    },
  });
}


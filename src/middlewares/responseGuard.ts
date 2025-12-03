import type { Request, Response, NextFunction } from "express";

export function responseGuard(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  res.sendSuccess = (body: any, mes = "success") => {
    res.status(200).json({
      body,
      mes,
      status_code: 200,
    });
  };

  res.sendError = (status: number, mes = "error") => {
    res.status(200).json({
      body: null,
      mes,
      status_code: status,
    });
  };

  next();
}

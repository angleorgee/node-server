import { Response } from "express";

export const sendSuccess = (
  res: Response,
  body: any,
  mes = "success"
) =>
  res.status(200).json({
    body,
    mes,
    status_code: 200,
  });

export const sendError = (
  res: Response,
  status: number,
  mes = "error"
) =>
  res.status(status).json({
    body: null,
    mes,
    status_code: status,
  });

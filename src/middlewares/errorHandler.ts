import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const message =
    err instanceof Error
      ? err.message
      : typeof err === "string"
        ? err
        : "未知错误";
  res.status(200).json({
    mes: "服务异常：" + message,
    status_code: 400,
    body: null
  });
}

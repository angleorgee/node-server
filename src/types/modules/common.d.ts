import "express";
declare type Recordable<T = any> = Record<string, T>;
declare global {
  namespace Express {
    interface Response {
      sendSuccess(body: any, mes?: string): void;
      sendError(status: number, mes?: string): void;
    }
  }
}
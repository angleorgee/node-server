import type { Request, Response, NextFunction } from "express";
import { rejects } from "node:assert";
import { z, ZodTypeAny } from "zod";

/**
 * generateValidator
 * @param schema zod schema
 * @param options.optionalArray 是否支持数组校验（默认 true）
 */
export function generateValidator<T extends ZodTypeAny>(
  schema: T,
  options: { optionalArray?: boolean } = { optionalArray: true }
) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      let data = req.body;

      if (options.optionalArray && Array.isArray(data)) {
        data = z.array(schema).parse(data);
      } else {
        data = schema.parse(data);
      }

      req.body = data; // ✅ 保证 Controller 类型安全
      next();
    } catch (err: any) {
      console.log(err.message)
      if (err instanceof z.ZodError) {
        throw new Error(err.message);
      }
      next(err);
    }
  };
}

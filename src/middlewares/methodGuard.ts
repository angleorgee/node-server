import type { Request, Response, NextFunction } from "express";

function getAllRoutes(router: any, prefix = ""): { path: string; methods: string[] }[] {
  let result: { path: string; methods: string[] }[] = [];

  router.stack.forEach((layer: any) => {
    if (layer.route) {
      // 真实路由
      const path = prefix + layer.route.path;
      const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase());
      result.push({ path, methods });
    } else if (layer.name === "router" && layer.handle.stack) {
      // 子 router
      const newPrefix = prefix + (layer.regexp.source
        .replace("^\\", "")
        .replace("\\/?(?=\\/|$)", "")
        .replace("\\/", "/")
        .replace("?$", "") || "");
      result = result.concat(getAllRoutes(layer.handle, newPrefix));
    }
  });

  return result;
}

export function methodNotAllowed(req: Request, res: Response, _next: NextFunction) {
  const allRoutes = getAllRoutes(req.app._router);
  const path = req.path;

  const matchedRoute = allRoutes.find(r => r.path === path);

  if (matchedRoute) {
    res.status(405).json({
      mes: `请求方法不被允许`,
      status_code: 405,
      body: null
    });
  } else {
    res.status(404).json({
      mes: "接口不存在",
      status_code: 404,
      body: null
    });
  }
}

import { Router } from "express";
import newsRoutes from "./modules/news.routes";
import recommendRoutes from "./modules/recommend.routes";

const router = Router();

// 统一挂载
router.use(newsRoutes);
router.use(recommendRoutes);

export default router;
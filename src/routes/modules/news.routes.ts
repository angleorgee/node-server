import { Router } from "express";
import * as newsController from "../../controllers/news.controller";
import { generateValidator } from "../../middlewares/validateSchema";
import { NewsItemSchema } from "../../types/modules/news";
import z from "zod";
const router = Router();

router.get("/news", newsController.getNews);
router.post("/addNews", generateValidator(z.array(NewsItemSchema)), newsController.addNews);
router.put("/:id", newsController.updateNews);
router.delete("/:id", newsController.deleteNews);

export default router;
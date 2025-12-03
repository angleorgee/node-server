import { Router } from "express";
import * as recommendController from "../../controllers/recommend.controller";
import { generateValidator } from "../../middlewares/validateSchema";
import { RecommendItemSchema } from "../../types/modules/recommend";
import z from "zod";
const router = Router();

router.get("/recommend", recommendController.getRecommend);
router.post("/addRecommend", generateValidator(z.array(RecommendItemSchema)), recommendController.addRecommend);
router.put("/:id", recommendController.updateRecommend);
router.delete("/:id", recommendController.deleteRecommend);

export default router;
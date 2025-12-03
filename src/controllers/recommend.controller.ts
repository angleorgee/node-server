import { Request, Response } from "express";
import * as recommendService from "../services/index.service";
import type { RecommendItem } from "../types";

export function getRecommend(_req: Request, res: Response) {
  const recommend = recommendService.getRecommendService();
  res.sendSuccess(recommend);
}

export function addRecommend(req: Request, res: Response) {
  const recommend = req.body as RecommendItem;
  recommendService.addRecommend(req);
  res.sendSuccess(recommend);
}

export function updateRecommend(req: Request, res: Response) {
  const id = req.params.id as string;
  const recommend = req.body as RecommendItem;
  recommendService.updateRecommend(req, res);
  res.json(recommend);
}

export function deleteRecommend(req: Request, res: Response) {
  const id = req.params.id as string;
  recommendService.deleteRecommend(req, res);
  res.sendStatus(200);
}
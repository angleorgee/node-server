import { Request, Response } from "express";
import { readJSON, writeJSON } from "../../utils";
import { RecommendItem } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { sendSuccess, sendError } from "../../utils/index";

// 获取新闻列表
export function getRecommendService(): RecommendItem[] {
  return readJSON<RecommendItem[]>("recommend.json");
}

// 添加新闻
export function addRecommend(req: Request) {
  try {
    const recommend: RecommendItem[] = req.body;
    const list = readJSON<RecommendItem[]>("recommend.json") || [];
    const recommendWithId = recommend.map(item => ({ ...item, id: uuidv4() }));
    list.unshift(...recommendWithId);
    writeJSON("recommend.json", list);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

// 删除新闻
export function deleteRecommend(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const list = readJSON<RecommendItem[]>("recommend.json") || [];
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return sendError(res, 404, "新闻不存在");
    list.splice(index, 1);
    writeJSON("recommend.json", list);
    sendSuccess(res, null, "删除成功");
  } catch (err: any) {
    sendError(res, 500, err.message);
  }
}

// 更新新闻
export function updateRecommend(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const recommend: RecommendItem = req.body;
    const list = readJSON<RecommendItem[]>("recommend.json") || [];
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return sendError(res, 404, "新闻不存在");
    list[index] = { ...recommend, id };
    writeJSON("recommend.json", list);
    sendSuccess(res, list[index], "更新成功");
  } catch (err: any) {
    sendError(res, 500, err.message);
  }
}

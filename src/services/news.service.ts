import { Request, Response } from "express";
import { readJSON, writeJSON } from "../utils";
import { NewsItem } from "../types";
import { v4 as uuidv4 } from "uuid";
import { sendSuccess, sendError } from "../utils/index";

// 获取新闻列表
export function getNewsService(): NewsItem[] {
  return readJSON<NewsItem[]>("news.json");
}

// 添加新闻
export function addNews(req: Request) {
  try {
    const news: NewsItem[] = req.body;
    const list = readJSON<NewsItem[]>("news.json") || [];
    const newsWithId = news.map(item => ({ ...item, id: uuidv4() }));
    list.unshift(...newsWithId);
    writeJSON("news.json", list);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

// 删除新闻
export function deleteNews(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const list = readJSON<NewsItem[]>("news.json") || [];
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return sendError(res, 404, "新闻不存在");
    list.splice(index, 1);
    writeJSON("news.json", list);
    sendSuccess(res, null, "删除成功");
  } catch (err: any) {
    sendError(res, 500, err.message);
  }
}

// 更新新闻
export function updateNews(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const news: NewsItem = req.body;
    const list = readJSON<NewsItem[]>("news.json") || [];
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return sendError(res, 404, "新闻不存在");
    list[index] = { ...news, id };
    writeJSON("news.json", list);
    sendSuccess(res, list[index], "更新成功");
  } catch (err: any) {
    sendError(res, 500, err.message);
  }
}

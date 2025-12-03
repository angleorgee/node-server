import { Request, Response } from "express";
import * as newsService from "../services/news.service";
import type { NewsItem } from "../types";

export function getNews(_req: Request, res: Response) {
  const news = newsService.getNewsService();
  res.sendSuccess(news);
}

export function addNews(req: Request, res: Response) {
  const news = req.body as NewsItem;
  newsService.addNews(req);
  res.sendSuccess(news);
}

export function updateNews(req: Request, res: Response) {
  const id = req.params.id as string;
  const news = req.body as NewsItem;
  newsService.updateNews(req, res);
  res.json(news);
}

export function deleteNews(req: Request, res: Response) {
  const id = req.params.id as string;
  newsService.deleteNews(req, res);
  res.sendStatus(200);
}
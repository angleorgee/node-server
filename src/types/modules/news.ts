import { z } from "zod";

export const NewsItemSchema = z.object({
  id: z.uuidv4().optional(),
  title: z.string(),
  content: z.string(),
});

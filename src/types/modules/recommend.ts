import { z } from "zod";

export const RecommendItemSchema = z.object({
  id: z.uuidv4().optional(),
  title: z.string(),
  content: z.string(),
});

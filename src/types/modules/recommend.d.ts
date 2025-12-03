import { RecommendItemSchema } from './recommend'
export type RecommendItem = z.infer<typeof RecommendItemSchema>;
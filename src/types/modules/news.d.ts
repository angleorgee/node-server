import { NewsItemSchema } from './news'
export type NewsItem = z.infer<typeof NewsItemSchema>;
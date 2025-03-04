export type Tweet = {
  id: number;
  body: string;
  author_id: number;
  createdAt: Date;
  likes: number;
  retweets: number;
};
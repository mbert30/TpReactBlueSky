import { User } from "../auth/types";

export type Tweet = {
  id?: number;
  body: string;
  userId: number;
  createdAt: Date;
  likes: number;
  retweets: number;
  user?: User
};
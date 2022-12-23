import type { IBlogFields, IBlog } from "types/contentful";

interface Post extends IBlogFields {
  id: string;
  createdAt: string;
}

type Posts = Array<Post>;

export type { IBlogFields, IBlog, Post, Posts };

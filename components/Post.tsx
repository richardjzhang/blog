import Markdown from "components/Markdown";
import { Post as PostType } from "types/contentful-types";
import React from "react";

interface Props {
  post: PostType;
}

export default function Post({ post }: Props) {
  return (
    <>
      <h2 className="text-4xl text-indigo-400 font-bold font-title">
        {post.title}
      </h2>
      <div className="text-gray-200 font-body">
        <p className="mt-3 text-sm">{post.createdAt}</p>
        <Markdown>{post.contentMarkdown}</Markdown>
      </div>
    </>
  );
}

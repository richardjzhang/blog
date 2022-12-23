import Head from "next/head";
import dayjs from "dayjs";
import Markdown from "components/Markdown";
import { Post as PostType } from "types/contentful-types";
import React from "react";

interface Props {
  post: PostType;
}

export default function Post({ post }: Props) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.spoiler} />
      </Head>
      <h1 className="text-4xl text-indigo-400 font-bold font-title">
        {post.title}
      </h1>
      <div className="text-gray-200 font-body">
        <p className="mt-3 text-sm ">
          {dayjs(post.createdAt).format("MMMM D, YYYY")}
        </p>
        <Markdown>{post.contentMarkdown}</Markdown>
      </div>
    </>
  );
}

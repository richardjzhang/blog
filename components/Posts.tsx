import Link from "next/link";
import dayjs from "dayjs";
import { Posts as PostsType } from "types/contentful-types";

interface Props {
  posts: PostsType;
}

export default function Posts({ posts }: Props) {
  return (
    <>
      {posts.map((post) => (
        <Link
          className="block mt-10 fit-content first:mt-0"
          key={post.id}
          href={`/post/${post.id}`}
        >
          <h1 className="text-2xl text-yellow-300 font-bold font-title">
            {post.title}
          </h1>
          <div className="font-body">
            <p className="mt-2 text-sm text-gray-300">
              {dayjs(post.createdAt).format("MMMM D, YYYY")}
            </p>
            <p className="mt text-lg text-gray-200">{post.spoiler}</p>
          </div>
        </Link>
      ))}
    </>
  );
}

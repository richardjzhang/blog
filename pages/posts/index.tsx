import Head from "next/head";
import { IBlog } from "types/contentful-types";
import ContentService from "utils/contentful-service";
import Posts from "components/Posts";
import RssIcon from "components/RssIcon";

interface Props {
  posts: Array<IBlog>;
}

export async function getStaticProps() {
  const posts = await ContentService.instance.getEntriesByType<IBlog>("blog");
  return {
    props: {
      posts,
    },
  };
}

export default function Home(props: Props) {
  const { posts } = props;
  return (
    <>
      <Head>
        <title>Posts - Richard Zhang</title>
        <meta
          name="description"
          content="A personal site for all my thoughts, by Richard Zhang"
        />
      </Head>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-title text-yellow-300">Posts</h1>
        <RssIcon />
      </div>
      <Posts
        posts={posts.map((entry) => ({
          ...entry.fields,
          id: entry.sys.id,
          createdAt: entry.fields.publishDate || entry.sys.createdAt,
        }))}
      />
    </>
  );
}

import Head from "next/head";
import { IBlog } from "types/contentful-types";
import ContentService from "utils/contentful-service";
import Posts from "components/Posts";

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
        <title>Ramblings and Musings</title>
        <meta
          name="description"
          content="A blog for all my thoughts, by Richard Zhang"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Posts
        posts={posts.map((entry) => ({
          ...entry.fields,
          id: entry.sys.id,
          createdAt: entry.sys.createdAt,
        }))}
      />
    </>
  );
}

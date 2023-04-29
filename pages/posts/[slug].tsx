import dayjs from "dayjs";
import Head from "next/head";
import Post from "components/Post";
import { IBlog } from "types/contentful-types";
import ContentService from "utils/contentful-service";

interface Params {
  params: {
    slug: string;
  };
}

interface Props {
  slug: string;
  post: IBlog;
}

export async function getStaticPaths() {
  const posts = await ContentService.instance.getEntriesByType("blog");
  const paths = posts.map((post: IBlog) => ({
    params: { slug: post.fields.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: Params) {
  const { slug } = params;
  try {
    const posts = await ContentService.instance.getBlogEntryBySlug(slug);
    return {
      props: {
        slug: slug,
        post: posts.items[0],
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}

export default function PostPage({ slug, post }: Props) {
  const createdAt = post.fields.publishDate || post.sys.createdAt;
  const formattedCreatedAt = dayjs(createdAt).format("MMMM D, YYYY");
  const ogImage = `https://www.richardjzhang.com/api/og?title=${encodeURIComponent(
    post.fields.title
  )}&publishDate=${encodeURIComponent(
    formattedCreatedAt
  )}&description=${encodeURIComponent(post.fields.spoiler)}`;
  return (
    <>
      <Head>
        <title>{post.fields.title}</title>
        {/* Generic og tags */}
        <meta property="og:title" content={post.fields.title} />
        <meta property="og:description" content={post.fields.spoiler} />
        <meta property="og:image" content={ogImage} />
        <meta name="description" content={post.fields.spoiler} />
        <meta
          property="og:url"
          content={`https://www.richardjzhang.com/posts/${slug}`}
        />
        {/* Twitter og tags */}
        <meta property="twitter:image" content={ogImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={post.fields.title} />
        <meta property="twitter:description" content={post.fields.spoiler} />
      </Head>
      <Post
        post={{
          ...post.fields,
          id: post.sys.id,
          createdAt: formattedCreatedAt,
        }}
      />
    </>
  );
}

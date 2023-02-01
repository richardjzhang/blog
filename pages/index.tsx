import Head from "next/head";
import Image from "next/image";
import { IBlog } from "types/contentful-types";
import ContentService from "utils/contentful-service";
import Posts from "components/Posts";
import Work from "components/Work";
import SocialIcon from "components/SocialIcon";

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
        <title>Richard Zhang</title>
        <meta
          name="description"
          content="A personal site for all my thoughts, by Richard Zhang"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="grid grid-col-1 gap-y-10 divide-y-2 divide-slate-700">
        <div>
          <div className="flex items-center">
            <Image
              src="/profile-pic.png"
              width={100}
              height={100}
              alt="Profile Pic"
              className="rounded-full border-2"
            />
            <h1 className="ml-8 text-5xl font-title text-indigo-400">
              Hey! I'm Richard
            </h1>
          </div>
          <p className="mt-8 font-body text-xl text-gray-200">
            I'm a software engineer based in Sydney, Australia. I'm currently
            working as a sales engineer at Vercel, where I empower frontend
            teams across small and large companies to build and ship their
            applications faster using Next.js and Vercel.
          </p>
          <div className="mt-4 flex items-center space-x-3">
            <SocialIcon url="https://github.com/richardjzhang" />
            <SocialIcon url="https://www.linkedin.com/in/richardjzhang/" />
            <SocialIcon url="mailto:hello@richardjzhang.com?subject=Website%20Inquiry" />
          </div>
        </div>
        <div className="pt-10">
          <h2 className="text-3xl font-title text-yellow-300">Recent Posts</h2>
          <Posts
            posts={posts
              .map((entry) => ({
                ...entry.fields,
                id: entry.sys.id,
                createdAt: entry.sys.createdAt,
              }))
              .slice(0, 4)}
          />
        </div>
        <div className="pt-10">
          <h2 className="text-3xl font-title text-yellow-300">Work</h2>
          <Work />
        </div>
      </div>
    </>
  );
}

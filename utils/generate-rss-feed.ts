import { IBlog } from "types/contentful-types";
import fs from "fs";
import { Feed } from "feed";

export default async function generateRssFeed(posts: Array<IBlog>) {
  const site_url = process.env.WEBSITE_URL;
  if (!site_url) throw new Error("The site url is not defined!");
  const author = {
    name: "Richard Zhang",
    email: "hello@richardjzhang.com",
    link: "https://twitter.com/zirichii",
  };
  const feedOptions = {
    title: "Richard Zhang",
    description: "A personal site for all my thoughts, by Richard Zhang",
    id: site_url,
    link: site_url,
    image: `${site_url}/profile-pic.webp`,
    favicon: `${site_url}/profile-pic.webp`,
    copyright: `© ${new Date().getFullYear()} Richard Zhang. All rights reserved.`,
    feedLinks: {
      rss2: `${site_url}/rss/feed.xml`,
      // other feed formats
      json: `${site_url}/rss/feed.json`,
      atom: `${site_url}/rss/atom.xml`,
    },
    author,
  };

  const feed = new Feed(feedOptions);

  posts.forEach((post) => {
    feed.addItem({
      title: post.fields.title,
      id: post.sys.id,
      link: `${site_url}/posts/${post.fields.slug}`,
      description: post.fields.spoiler,
      date: new Date(post.fields.publishDate || post.sys.createdAt),
    });
  });

  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("./public/rss/feed.json", feed.json1());
}

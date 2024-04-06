import { createClient } from "contentful";
import { loadEnvConfig } from "@next/env";

/*
 * We tell TypeScript that those environment variables are always defined.
 * If you want to learn more about this madness, read:
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONTENTFUL_SPACE_ID: string;
      CONTENTFUL_ACCESS_TOKEN: string;
      PWD: string;
    }
  }
}

loadEnvConfig(process.env.PWD);

export default class ContentService {
  static get instance() {
    return new ContentService();
  }

  client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  async getEntriesByType<T>(type: string): Promise<any> {
    return (
      await this.client.getEntries<T>({
        content_type: type,
        order: "-fields.publishDate",
      })
    ).items;
  }

  async getBlogEntryById<T>(id: string) {
    return await this.client.getEntry<T>(id);
  }

  async getBlogEntryBySlug<T>(slug: string) {
    return await this.client.getEntries<T>({
      content_type: "blog",
      "fields.slug": slug,
    });
  }
}

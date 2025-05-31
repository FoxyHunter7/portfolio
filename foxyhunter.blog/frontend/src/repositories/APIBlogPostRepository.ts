import config from "@/data/config";
import { APIRepository } from "./APIRepository";
import type { IBlogPostRepository } from "./IBlogPostRepository";

export class APIBlogPostRepository extends APIRepository implements IBlogPostRepository {
  async getBlogPosts(): Promise<{success: boolean, errors?: string[], data?: object;}> {
    return await super.fetchServerJSON(`${config.API_URI}/posts`, 'GET');
  }
  async getBlogPost(slug: string): Promise<{success: boolean, errors?: string[], data?: object;}> {
    return await super.fetchServerJSON(`${config.API_URI}/posts/${slug}`, 'GET')
  }
}

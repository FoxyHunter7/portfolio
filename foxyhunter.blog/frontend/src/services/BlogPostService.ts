import type { IBlogPostRepository } from "@/repositories/IBlogPostRepository";
import type { BlogPost, BlogPostOverview } from "@/types/BlogDataTypes";

export class BlogPostService {
  private repository: IBlogPostRepository;

  constructor(repository: IBlogPostRepository) {
    this.repository = repository;
  }

  async getBlogPosts(): Promise<BlogPostOverview[] | null> {
    const response = await this.repository.getBlogPosts();

    if (response.success && response.data) {
      return response.data as BlogPostOverview[]
    } else {
      if (response.errors) { console.warn(response.errors); }
      return null
    }
  }

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    const response = await this.repository.getBlogPost(slug);

    if (response.success && response.data) {
      return response.data as BlogPost
    } else {
      if (response.errors) { console.warn(response.errors); }
      return null
    }
  }
}

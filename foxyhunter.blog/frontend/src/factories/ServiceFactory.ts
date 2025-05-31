import { BlogPostService } from "@/services/BlogPostService";
import { RepositoryFactory } from "./RepositoryFactory";
import { APIBlogPostRepository } from "@/repositories/APIBlogPostRepository";

export class ServiceFactory {
  private static blogPostService: BlogPostService;

  public static getBlogPostService(): BlogPostService {
    if (!this.blogPostService) {
      this.blogPostService = new BlogPostService(
        RepositoryFactory.getRepository(APIBlogPostRepository)
      );
    }
    return this.blogPostService
  }
}

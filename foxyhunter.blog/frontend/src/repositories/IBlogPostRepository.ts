export interface IBlogPostRepository {
  getBlogPosts(): Promise<{success: boolean, errors?: string[], data?: object;}>
  getBlogPost(slug: string): Promise<{success: boolean, errors?: string[], data?: object;}>
}

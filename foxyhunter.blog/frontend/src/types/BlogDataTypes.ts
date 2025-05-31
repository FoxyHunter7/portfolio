type BlogPost = {
  slug: string,
  date: Date,
  html: string
}

type BlogPostOverview = {
  slug: string,
  title: string,
  date: Date,
  thumbnailUrl: string | null
}

export type { BlogPost, BlogPostOverview }

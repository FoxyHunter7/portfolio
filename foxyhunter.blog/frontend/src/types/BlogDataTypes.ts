type BlogPost = {
  slug: string,
  date: string,
  html: string
}

type BlogPostOverview = {
  slug: string,
  title: string,
  date: string,
  thumbnail_url: string | null
}

export type { BlogPost, BlogPostOverview }

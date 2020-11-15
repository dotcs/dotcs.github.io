export interface GhostPost {
  uuid: string;
  slug: string;
  title: string;
  excerpt: string;
  html: string;
  published_at: string;
  primary_author: GhostAuthor;
  authors: GhostAuthor[];
  tags: GhostTag[];
}

export interface PostAttributes {
    title: string;
    excerpt: string;
    keywords: string[];
    authors: string[];
    published_at: string;
    updated_at: string;
}

export interface PostAttributesExt extends PostAttributes {
    slug: string;
}

export interface Post {
    attributes: PostAttributesExt,
    body: string;
}

export interface GhostPostMeta {
  pagination: GhostPagination;
}

export interface GhostTag {
  name: string;
  slug: string;
  visibility: string;
  count?: {
    posts: number;
  }
}

export interface GhostAuthor {
  name: string;
  slug: string;
  profile_image: string;
  cover_image: string;
  bio: string;
}

export interface GhostPagination {
  page: number;
  limit: number;
  pages: number;
  total: number;
  next: string;
  prev: string;
}

export interface GhostTagsResponse {
  tags: GhostTag[];
  meta: {
    pagination: GhostPagination;
  }
}

export interface GhostContentSettings {
  title: string;
  description: string;
  logo: string;
  icon: string;
  cover_image: string;
  facebook: string;
  twitter: string;
  lang: string;
  timezone: string;
  // navigation: 
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  url: string;
  codeinjection_head?: string;
  codeinjection_foot?: string;
}

export interface PageSettings {
    title: string;
    baseUrl: string;
    description: string;
}
import { FrontMatterResult } from 'front-matter';

export type ContentType = 'post' | 'page';

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

export type Post = FrontMatterResult<PostAttributesExt>;

export interface TagCount {
    slug: string;
    count: number;
}

export interface PageSettings {
    title: string;
    baseUrl: string;
    description: string;
    twitterHandle: string;
    githubHandle: string;
    fosstodonHandle: string;
    themeColor: string;
}

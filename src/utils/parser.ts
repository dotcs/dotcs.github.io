import fm from 'front-matter';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

import { ContentType, ParsedPost, TagCount, TagInfo, TagInfoMap } from '../types';

// TODO: relative paths
const posts_dir = path.join('content', 'posts');
const pages_dir = path.join('content', 'pages');

const parseFile = (p: string): ParsedPost => {
    const content = fs.readFileSync(p, 'utf-8');

    const parsed: ParsedPost = fm(content);
    // Slug is missing at this point. It will be added in next line.
    parsed.attributes.slug = path.basename(p).split('.')[0];
    return parsed;
};

const _getAllPostsOrPages = (type: ContentType): ParsedPost[] => {
    const dir = type === 'post' ? posts_dir : pages_dir;
    const files = fs.readdirSync(dir);
    const contents: ParsedPost[] = files.map((f) => parseFile(path.join(dir, f)));
    for (const content of contents) {
        content.attributes.keywords = _.sortedUniq(content.attributes.keywords.sort());
    }
    const sortedContent = _.sortBy(contents, 'attributes.published_at');
    return sortedContent;
};

export const getAllPages = (): ParsedPost[] => {
    return _getAllPostsOrPages('page');
};

export const getAllPosts = (): ParsedPost[] => {
    return _getAllPostsOrPages('post');
};

export const getAllTags = (): string[] => {
    const contents = getAllPosts();
    const tags = contents.reduce((acc, c) => acc.concat(c.attributes.keywords), [] as string[]);
    return tags;
};

export const _getAllSlugs = (type: ContentType): string[] => {
    const contents = _getAllPostsOrPages(type);
    const slugs = _.sortedUniq(contents.reduce((acc, c) => acc.concat(c.attributes.slug), [] as string[]).sort());
    return slugs;
};

export const getAllPostSlugs = (): string[] => {
    return _getAllSlugs('post');
};

export const getAllPageSlugs = (): string[] => {
    return _getAllSlugs('page');
};

export const getTagInfo = (): TagInfoMap => {
    const content = fs.readFileSync('content/tags.yaml').toString('utf-8');
    const tags = yaml.load(content) as TagInfoMap;
    return tags;
};

export const getTagCounts = (): TagCount[] => {
    const tagCounter = getAllPosts().reduce((acc, p) => {
        for (const kw of p.attributes.keywords) {
            if (acc[kw]) {
                acc[kw] += 1;
            } else {
                acc[kw] = 1;
            }
        }
        return acc;
    }, {} as { [key: string]: number });
    const tags: TagCount[] = _.sortBy(
        Object.keys(tagCounter).map((slug) => ({ slug, count: tagCounter[slug] })),
        'slug'
    );
    return tags;
};

export const getPostsByTag = (tag: string): ParsedPost[] => {
    return getAllPosts().filter((p) => p.attributes.keywords.includes(tag));
};

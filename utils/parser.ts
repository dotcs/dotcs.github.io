import fm, { FrontMatterResult } from 'front-matter';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import { PostAttributesExt } from '../types';

// TODO: relative paths
const posts_dir = path.join('content', 'posts');
const pages_dir = path.join('content', 'pages');

type ContentType = 'post' | 'page';

const _getAllPostsOrPages = (type: ContentType): FrontMatterResult<PostAttributesExt>[] => {
    const dir = type === 'post' ? posts_dir : pages_dir;
    const files = fs.readdirSync(dir);
    const contents: FrontMatterResult<PostAttributesExt>[] = 
        files.map(f => parseFile(path.join(dir, f)));
    for (let content of contents) {
        content.attributes.keywords = _.sortedUniq(content.attributes.keywords.sort());
    }
    const sortedContent = _.sortBy(contents, 'attributes.published_at');
    return sortedContent;

}

export const getAllPages = (): FrontMatterResult<PostAttributesExt>[] => {
    return _getAllPostsOrPages('page');
}

export const getAllPosts = (): FrontMatterResult<PostAttributesExt>[] => {
    return _getAllPostsOrPages('post');
}

const parseFile = (p: string): FrontMatterResult<PostAttributesExt> => {
    const content = fs.readFileSync(p, 'utf-8');

    const parsed: FrontMatterResult<PostAttributesExt> = fm(content);
    // Slug is missing at this point. It will be added in next line.
    parsed.attributes.slug = path.basename(p).split('.')[0];
    return parsed;
};

export const getAllTags = (): string[] => {
    const contents = getAllPosts();
    const tags = contents.reduce((acc, c) => acc.concat(c.attributes.keywords), []);
    return tags;
};

export const _getAllSlugs = (type: ContentType): string[] => {
    const contents = _getAllPostsOrPages(type);
    const slugs = _.sortedUniq(contents.reduce((acc, c) => acc.concat(c.attributes.slug), []).sort());
    return slugs;
};

export const getAllPostSlugs = (): string[] => {
    return _getAllSlugs('post');
};

export const getAllPageSlugs = (): string[] => {
    return _getAllSlugs('page');
};

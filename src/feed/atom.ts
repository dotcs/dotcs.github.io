import builder from 'xmlbuilder';
import fs from 'fs';

import { pageSettings } from '../settings';
import { getAllPosts, getAllTags, getPostsByTag } from '../utils/parser';
import md from '../utils/markdown';
import { Post } from '../types';

// Useful links:
// -------------
// Atom Spec: https://validator.w3.org/feed/docs/atom.html
// Atom Validator: https://validator.w3.org/feed/check.cgi

const isProduction = process.env.NODE_ENV === 'production';

type FeedType = 'all_posts' | 'tag';

interface FeedCfg {
    type: FeedType;
    tag?: string;
}

const getFeedPaths = (type: FeedType, tag?: string) => {
    let xml = 'feeds/index.xml';
    let html = '/';
    if (type === 'tag') {
        if (!tag) {
            throw new Error('Tag must be defined');
        }
        xml = `feeds/tags/${tag}.xml`;
        html = `/tags/${tag}`;
    }
    return { xml, html };
};

const gettFeedTitle = (type: FeedType, tag?: string) => {
    switch (type) {
        case 'all_posts':
            return pageSettings.title;
        case 'tag':
            return `Tag: ${tag} - ${pageSettings.title}`;
    }
};

const getPosts = (type: FeedType, tag?: string): Post[] => {
    switch (type) {
        case 'all_posts': {
            const posts = getAllPosts();
            posts.reverse();
            return posts;
        }
        case 'tag': {
            const posts = getPostsByTag(tag);
            posts.reverse();
            return posts;
        }
    }
};

const buildFeed = (cfg: FeedCfg) => {
    const { xml: xmlPath, html: htmlPath } = getFeedPaths(cfg.type, cfg.tag);
    const feedTitle = gettFeedTitle(cfg.type, cfg.tag);
    const posts = getPosts(cfg.type, cfg.tag);

    const now = new Date();

    const feed = {
        feed: {
            '@xmlns': 'http://www.w3.org/2005/Atom',
            title: feedTitle,
            link: [
                { '@href': `${pageSettings.baseUrl}/${xmlPath}`, '@rel': 'self', '@type': 'application/atom+xml' },
                { '@href': `${pageSettings.baseUrl}/${htmlPath}`, '@rel': 'alternate', '@type': 'text/html' },
            ],
            updated: now.toISOString(),
            author: [{ name: 'dotcs' }],
            id: pageSettings.baseUrl + '/',
            entry: posts.map((p) => {
                const pageHref = pageSettings.baseUrl + '/posts/' + p.attributes.slug;
                return {
                    title: p.attributes.title,
                    published: p.attributes.published_at,
                    updated: p.attributes.updated_at,
                    id: pageHref,
                    link: {
                        '@href': pageHref,
                    },
                    summary: p.attributes.excerpt,
                    content: {
                        '@type': 'html',
                        '@xml:base': pageHref,
                        '#text': md.render(p.body),
                    },
                    author: p.attributes.authors.map((name) => ({ name })),
                    category: p.attributes.keywords.map((kw) => ({ '@term': kw })),
                };
            }),
        },
    };

    const xml = builder.create(feed).end({ pretty: !isProduction });
    fs.writeFileSync(`out/${xmlPath}`, xml);
};

const run = () => {
    fs.mkdirSync('out/feeds/tags', { recursive: true });

    // Configure and generate all feeds
    const feedCgfs: FeedCfg[] = getAllTags().map((tag) => ({
        type: 'tag',
        tag,
    }));
    feedCgfs.push({ type: 'all_posts' });

    for (const cfg of feedCgfs) {
        buildFeed(cfg);
    }
};

run();

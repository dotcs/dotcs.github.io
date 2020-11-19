import builder from 'xmlbuilder';
import fs from 'fs';

import { pageSettings } from '../settings';
import { getAllPosts } from '../utils/parser';
import md from '../utils/markdown';

const now = new Date();
const posts = getAllPosts();
posts.reverse();

const feed = {
    feed: {
        '@xmlns': 'http://www.w3.org/2005/Atom',
        title: pageSettings.title,
        link: [
            { '@href': pageSettings.baseUrl + '/feed.xml', '@rel': 'self', '@type': 'application/atom+xml' },
            { '@href': pageSettings.baseUrl, '@rel': 'alternate', '@type': 'text/html' },
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

const xml = builder.create(feed).end({ pretty: true });

fs.writeFileSync('out/feed.xml', xml);

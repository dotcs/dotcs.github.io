import { PageSettings } from './types';

export const pageSettings: PageSettings = {
    title: 'dotcs.me',
    baseUrl: 'https://dotcs.me',
    description: "dotcs's personal weblog",
    twitterUserHandle: 'dotcsDE',
    githubUserHandle: 'dotcs',
    mastodonHandles: [
        { instanceBaseUrl: 'https://fosstodon.org', userHandle: 'dotcs' }
    ],
    themeColor: '#38b2ac',
    webmentionUrl: 'https://webmention.io/dotcs.me/webmention',
    pingbackUrl: 'https://webmention.io/dotcs.me/xmlrpc'
};

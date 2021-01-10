import { PageSettings, HCard } from './types';

export const pageSettings: PageSettings = {
    title: 'dotcs.me',
    baseUrl: 'https://dotcs.me',
    description: "dotcs's personal weblog",
    twitterUserHandle: 'dotcsDE',
    githubUserHandle: 'dotcs',
    mastodonHandles: [{ instanceBaseUrl: 'https://fosstodon.org', userHandle: 'dotcs' }],
    themeColor: '#38b2ac',
    webmentionUrl: 'https://webmention.io/dotcs.me/webmention',
    pingbackUrl: 'https://webmention.io/dotcs.me/xmlrpc',
};

export const mainHCard: HCard = {
    main: true,
    name: 'Fabian Mueller',
    honorificPrefix: 'Mr.',
    givenName: 'Fabian',
    familyName: 'Mueller',
    nickname: 'dotcs',
    photoRef: '/about/dotcs-profile.png',
    url: pageSettings.baseUrl,
    email: 'website@dotcs.me',
    locality: 'Stuttgart',
    region: {
        abbr: 'BW',
        title: 'Baden-Wuerttemberg',
    },
    country: 'Germany',
    category: 'web-dev',
    note: 'Passionate about the web, modern AI related technologies, Linux and CLI tools.',
    // gpgKey: process.env.GPG_KEY,
};

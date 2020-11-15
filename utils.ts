import { GhostContentSettings, GhostPost } from './types';
import replaceAll from 'string.prototype.replaceall';

function getConfig() {
    const backendServerURI = process.env.BACKEND_SERVER_URI;
    const backendApiURI = `${backendServerURI}/ghost/api/v3`;
    const backendToken = process.env.BACKEND_TOKEN;
    const siteURI = process.env.SITE_URI;
    const backendSiteURI = process.env.BACKEND_SITE_URI;
    return { serverURI: backendServerURI, apiURI: backendApiURI, siteURI, token: backendToken, backendSiteURI };
}

export async function fetchBackend(endpoint: string, params: {[key: string]: any } = {}) {
    const cfg = getConfig();
    const url = new URL(`${cfg.apiURI}${endpoint}`);
    const paramsDefault: {[key: string]: string } = { key: cfg.token };
    const urlParams = {...paramsDefault, ...params};
    Object.keys(urlParams).forEach(key => url.searchParams.append(key, urlParams[key]));
    console.debug('Request backend url', String(url));
    return await fetch(String(url)).then(res => res.json());
}

export async function fetchPost(endpoint: string, params: {[key: string]: any } = {}) {
    const cfg = getConfig();
    const res: { posts: GhostPost[] } = await fetchBackend(endpoint, params);
    if (!res.posts) { return null; }
    const post = res.posts[0];
    const html = replaceAll(post.html, cfg.backendSiteURI, cfg.siteURI);
    post.html = html;
    return post;
}

export async function fetchFeed() {
    const cfg = getConfig();
    const url = new URL(`${cfg.serverURI}/rss`);
    console.debug('Request backend url', String(url));
    let text = await fetch(String(url)).then(res => res.text());
    text = replaceAll(text, '/rss/', '/feeds/rss');
    text = replaceAll(text, cfg.backendSiteURI, cfg.siteURI);
    return text;
}

export async function fetchSettings() {
    const cfg = getConfig();
    const paramsDefault: {[key: string]: string } = { key: cfg.token };
    const urlParams = {...paramsDefault};
    const url = new URL(`${cfg.apiURI}/content/settings`);
    Object.keys(urlParams).forEach(key => url.searchParams.append(key, urlParams[key]));
    console.debug('Request backend url', String(url));

    // Patch url, because Ghost assumes it delivers its own frontend.
    const json: { settings: GhostContentSettings } = await fetch(String(url)).then(res => res.json());
    console.debug(`Overwrite ghost setting "url": ${json.settings.url} -> ${cfg.siteURI}`)
    json.settings.url = cfg.siteURI
    return json
}

export function patchHtml(html: string): string {
    let patchedHtml = html;

    patchedHtml = replaceAll(patchedHtml, '<table>', '<div class="x-table-wrapper"><table>');
    patchedHtml = replaceAll(patchedHtml, '</table>', '</table></div>');

    patchedHtml = replaceAll(patchedHtml, '<figure', '<div class="x-figure-wrapper"><figure');
    patchedHtml = replaceAll(patchedHtml, '</figure>', '</figure></div>');

    patchedHtml = patchedHtml.replace(/<h([1-6]) id="([^"]+)">(.*?)<\/h[1-6]>/g, 
        '<h$1 id="$2"><a href="#$2" class="hidden sm:inline-block x-headline-anchor"><i class="las la-hashtag"></i></a> $3</h$1>');

    return patchedHtml;
}
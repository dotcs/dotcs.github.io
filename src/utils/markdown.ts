import MarkdownIt from 'markdown-it';
import markdownItTocAndAnchor from 'markdown-it-toc-and-anchor';
import markdownItFootnote from 'markdown-it-footnote';
import hljs from 'highlight.js';
import Renderer from 'markdown-it/lib/renderer';

const md: MarkdownIt = new MarkdownIt({
    html: true,
    langPrefix: 'language-',
    highlight: function (str: string, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
            } catch (__) {
                // empty on purpose
            }
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    },
})
    .use(markdownItTocAndAnchor, {
        anchorLinkSymbol: '#',
        anchorLinkSymbolClassName: 'hidden sm:inline-block x-headline-anchor',
    })
    .use(markdownItFootnote);

/** Fallback renderer that always works. */
const fallbackRenderRule: Renderer.RenderRule = (tokens, idx, options, env, self) => {
    return self.renderToken(tokens, idx, options);
};

/** Default image renderer from markdown-it */
const defImageRenderRule: Renderer.RenderRule = md.renderer.rules.image || fallbackRenderRule;

/**
 * Custom image renderer that extracts the alt text and shows it as a
 * description below the image.
 */
const imageRenderRule: Renderer.RenderRule = (tokens, idx, options, env, self) => {
    // Add classes to img tag
    tokens[idx].attrPush(['class', 'inline-block mb-2']);

    // Get default rendering, as images would have been rendered without this
    // custom image renderer.
    const defaultRendering = defImageRenderRule(tokens, idx, options, env, self);

    // Extract information from the alt attribute.
    const aIndex = tokens[idx].attrIndex('alt');
    let alt = '';
    if (aIndex > 0) {
        alt = tokens[idx].attrs![aIndex][1];
    }

    // Wrap standard rendering with custom rendering that also includes the alt
    // text.
    return `
        <div class="text-center bg-gray-100 py-2">
            <div class="overflow-x-auto px-1">
                ${defaultRendering}
            </div>
            <div class="italic text-gray-700">${alt}</div>
        </div>
    `;
};

// Overwrite image renderer with custom implementation.
md.renderer.rules.image = imageRenderRule;

/** Default link_open render rule. */
const defLinkOpenRenderRule: Renderer.RenderRule = md.renderer.rules.link_open || fallbackRenderRule;

/**
 * Custom link_open render rule that adds meta-information on external links.
 */
const linkOpenRenderRule: Renderer.RenderRule = (tokens, idx, options, env, self) => {
    let hrefAIndex: number;
    let url: URL;

    // pass token to default renderer.
    const defaultRendering = defLinkOpenRenderRule(tokens, idx, options, env, self);

    try {
        hrefAIndex = tokens[idx].attrIndex('href');
    } catch {
        return defaultRendering;
    }

    try {
        const href = tokens[idx].attrs![hrefAIndex][1];
        // Try to parse URL. Does fail if link is only refering to an HTML
        // anchor.
        url = new URL(href);
    } catch {
        return defaultRendering;
    }

    if (hrefAIndex < 0 || url.hostname.match(/dotcs.me$/)) {
        // pass token to default renderer.
        return defaultRendering;
    }

    let icon = '';
    if (url.hostname.match(/github.com$/)) {
        icon = 'lab la-github';
    } else {
        icon = 'las la-external-link-alt';
    }

    // pass token to default renderer.
    return defaultRendering + `<i class="${icon}" title="This link refers to an external site"></i>`;
};

// Overwrite default link_open render rule with custom implementation.
md.renderer.rules.link_open = linkOpenRenderRule;

// Overwrite table tags, to that table is wrapped by div.
md.renderer.rules.table_open = () => '<div class="overflow-x-auto"><table>';
md.renderer.rules.table_close = () => '</table></div>';

export default md;

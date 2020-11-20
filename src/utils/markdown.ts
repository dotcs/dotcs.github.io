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

/** Default image renderer from markdown-it */
const defaultImageRenderer: Renderer.RenderRule = md.renderer.rules.image;

/**
 * Custom image renderer that extracts the alt text and shows it as a
 * description below the image.
 */
const customImageRender: Renderer.RenderRule = (tokens, idx, options, env, self) => {
    // Add classes to img tag
    tokens[idx].attrPush(['class', 'inline-block mb-2']);

    // Get default rendering, as images would have been rendered without this
    // custom image renderer.
    const defaultRendering = defaultImageRenderer(tokens, idx, options, env, self);

    // Extract information from the alt attribute.
    const aIndex = tokens[idx].attrIndex('alt');
    let alt = '';
    if (aIndex > 0) {
        alt = tokens[idx].attrs[aIndex][1];
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

// Overwrite image renderer, so that custom renderer is used instead.
md.renderer.rules.image = customImageRender;

export default md;

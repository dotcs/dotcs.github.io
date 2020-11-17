import { FC } from 'react';
import MarkdownIt from 'markdown-it';
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor"
import markdownItFootnote from 'markdown-it-footnote';
import hljs from 'highlight.js';

export interface MarkdownProps {
    text: string;
    className?: string;
}

const md = new MarkdownIt({
    html: true,
    langPrefix: 'language-',
    highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }
 
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
}).use(markdownItTocAndAnchor, {
    anchorLinkSymbol: '#',
    anchorLinkSymbolClassName: 'hidden sm:inline-block x-headline-anchor',
}).use(markdownItFootnote);

const Markdown: FC<MarkdownProps> = (props) => {
    const html = md.render(props.text);
    return (
        <div className={props.className} dangerouslySetInnerHTML={{__html: html}} />
    );
};

export default Markdown;

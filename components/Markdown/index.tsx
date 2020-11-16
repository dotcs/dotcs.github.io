import { FC } from 'react';
import MarkdownIt from 'markdown-it';
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor"

export interface MarkdownProps {
    text: string;
    className?: string;
}

const md = new MarkdownIt().use(markdownItTocAndAnchor, {
    anchorLinkSymbol: '#',
    anchorLinkSymbolClassName: 'hidden sm:inline-block x-headline-anchor',
});

const Markdown: FC<MarkdownProps> = (props) => {
    const html = md.render(props.text);
    return (
        <div className={props.className} dangerouslySetInnerHTML={{__html: html}} />
    );
};

export default Markdown;

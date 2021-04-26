import { FC } from 'react';

import md from '../utils/markdown';

export interface MarkdownProps {
    text: string;
    className?: string;
    rootEl?: 'div' | 'aside';
}

const Markdown: FC<MarkdownProps> = (props) => {
    const html = md.render(props.text);
    const El = props.rootEl!;
    return <El className={props.className} dangerouslySetInnerHTML={{ __html: html }} />;
};

Markdown.defaultProps = {
    rootEl: 'div',
};

export default Markdown;

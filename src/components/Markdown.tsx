import { FC } from 'react';

import md from '../utils/markdown';

export interface MarkdownProps {
    text: string;
    className?: string;
}

const Markdown: FC<MarkdownProps> = (props) => {
    const html = md.render(props.text);
    return <div className={props.className} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Markdown;

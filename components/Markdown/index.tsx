import { FC } from 'react';
import MarkdownIt from 'markdown-it';

export interface MarkdownProps {
    text: string;
    className?: string;
}

const md = new MarkdownIt();

const Markdown: FC<MarkdownProps> = (props) => {
    const html = md.render(props.text);
    return (
        <div className={props.className} dangerouslySetInnerHTML={{__html: html}} />
    );
};

export default Markdown;

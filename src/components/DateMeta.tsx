import Link from 'next/link';
import { FC } from 'react';

export interface DateMetaProps {
    published_at: string;
    updated_at: string;
    authors: string[];
    className?: string;
}

interface MetaTimeProps {
    time: string;
    className?: string;
}

const MetaTime: FC<MetaTimeProps> = (props) => (
    <time title={props.time} className={props.className}>
        {props.time.substr(0, '2000-01-01'.length)}</time>
);

const DateMeta: FC<DateMetaProps> = (props) => {
    const isUpdated = props.updated_at !== props.published_at;

    return (
        <p className={props.className}>
            posted on <MetaTime time={props.published_at} className="dt-published" /> by 
            <ul className="inline ml-1">
                {props.authors.map(author => (
                    <li key={author} className="p-author h-card inline-block">
                        <Link href="/">
                            <a className="u-url">
                                <img src="/about/dotcs-profile.png" className="u-photo rounded-full hidden" />
                                <span className="p-name">{author}</span>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
            {isUpdated && (
                <>
                    , last updated on <MetaTime time={props.updated_at} />
                </>
            )}
        </p>
    );
};

export default DateMeta;

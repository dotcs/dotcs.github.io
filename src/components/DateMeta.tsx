import Link from 'next/link';
import { FC } from 'react';
import cx from 'classnames';

export interface DateMetaProps {
    published_at: string;
    updated_at: string;
    authors: string[];
    className?: string;
}

interface MetaTimeProps {
    time: string;
    type: 'published' | 'updated';
}

const MetaTime: FC<MetaTimeProps> = (props) => (
    <>
        <abbr title={props.time}>{props.time.substring(0, '2020-01-01'.length)}</abbr>
        <time className={cx('hidden', {'dt-published': props.type === 'published'})}>{props.time}</time>
    </>
);

const DateMeta: FC<DateMetaProps> = (props) => {
    const isUpdated = props.updated_at !== props.published_at;

    return (
        <p className={props.className}>
            posted on <MetaTime time={props.published_at} type="published" /> by 
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
                    , last updated on <MetaTime time={props.updated_at} type='updated' />
                </>
            )}
        </p>
    );
};

export default DateMeta;

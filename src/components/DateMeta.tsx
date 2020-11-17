import { FC } from 'react';

export interface DateMetaProps {
    published_at: string;
    updated_at: string;
    authors: string[];
    className?: string;
}

interface MetaTimeProps {
    time: string;
}

const MetaTime: FC<MetaTimeProps> = (props) => (
    <abbr title={props.time}>{props.time.substr(0, '2000-01-01'.length)}</abbr>
);

const DateMeta: FC<DateMetaProps> = (props) => {
    const isUpdated = props.updated_at !== props.published_at;

    return (
        <p className={props.className}>
            posted on <MetaTime time={props.published_at} /> by {props.authors.join(', ')}
            {isUpdated && (
                <>
                    , last updated on <MetaTime time={props.updated_at} />
                </>
            )}
        </p>
    );
};

export default DateMeta;

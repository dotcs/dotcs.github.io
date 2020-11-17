import { FC } from "react";
import cx from 'classnames';

import { PostAttributesExt } from "../types";
import Link from "next/link";

export interface PostMetaProps {
    attributes: PostAttributesExt;
    className?: string;
}

interface MetaTimeProps {
    time: string;
}

const MetaTime: FC<MetaTimeProps> = (props) => (
    <abbr title={props.time}>{props.time.substr(0, '2000-01-01'.length)}</abbr>
);

const PostMeta: FC<PostMetaProps> = (props) => {
    const isUpdated = props.attributes.updated_at !== props.attributes.published_at;
    return (
        <div className={cx("font-thin text-sm", props.className)}>
            <p className="mb-1">posted on <MetaTime time={props.attributes.published_at} /> by {props.attributes.authors.join(', ')}
                {isUpdated && 
                    <>, last updated on <MetaTime time={props.attributes.updated_at} /></>
                }
            </p>
            <p>
                <i className="las la-tags inline-block mr-2 relative" style={{top: 2}}></i>
                <ul className="inline-block">
                    {props.attributes.keywords.map(item => (
                        <li key={item} className="inline-block mr-2">
                            <Link href="/tags/[slug]" as={"/tags/" + item}><a className="x-link">{item}</a></Link>
                        </li>
                    ))}
                </ul>
            </p>
        </div>
    );
}

export default PostMeta;

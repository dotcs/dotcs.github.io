import { FC } from 'react';
import Link from 'next/link'

import { Post } from '../../types';

export interface PostItemProps extends Post {
}

export const PostItem: FC<PostItemProps> = (props) => (
    <div className="mb-12" key={props.attributes.slug}>
        <h2 className="text-3xl font-semibold mb-4">
            <Link href="/posts/[slug]" as={`/posts/${props.attributes.slug}`}>
                <a className="x-link">{props.attributes.title}</a>
            </Link>
        </h2>
        <p className="font-thin mb-2 text-sm">
            posted on {props.attributes.published_at.substr(0, '2020-01-01'.length)} by {props.attributes.authors.join(', ')}
        </p>
        <p className="mb-2">{props.attributes.excerpt}</p>
        <div className="text-sm">
            <i className="las la-tags align-middle" />
            <ul className="inline-block text-gray-800">
                {props.attributes.keywords.map(keyword => (
                    <li key={keyword} className="inline-block ml-2">
                        <Link href="/tags/[slug]" as={`/tags/${keyword}`}>
                            <a className="x-link">{keyword}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

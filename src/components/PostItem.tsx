import { FC } from 'react';
import Link from 'next/link';

import { PostAttributes } from '../types';
import TagList from './TagList';
import DateMeta from './DateMeta';

export interface PostItemProps {
    attributes: PostAttributes;
}

export const PostItem: FC<PostItemProps> = (props) => (
    <div className="mb-12" key={props.attributes.slug}>
        <h2 className="text-2xl md:text-3xl font-semibold mb-1">
            <Link href="/posts/[slug]" as={`/posts/${props.attributes.slug}`}>
                <a className="x-link">{props.attributes.title}</a>
            </Link>
        </h2>
        <DateMeta
            className="text-sm font-light mb-2"
            published_at={props.attributes.published_at}
            updated_at={props.attributes.updated_at}
            authors={props.attributes.authors}
        />
        <p className="mb-2">{props.attributes.excerpt}</p>
        <TagList tags={props.attributes.keywords} className="text-sm font-light" />
    </div>
);

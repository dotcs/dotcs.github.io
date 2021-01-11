import { FC } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Head from 'next/head';

import { ParsedPost as PostType } from '../types';
import DateMeta from './DateMeta';
import Markdown from './Markdown';
import TagList from './TagList';
import { getBlogPostJsonLd, wrapSchmeaContext } from '../utils/schema';

export interface PostProps {
    post: PostType;
    className?: string;
}

/**
 * Helper method to replace template variables.
 *
 * Currently the following variables are replaced:
 * - `<post_slug>` => slug of the post
 */
const replaceTemplateVars = (slug: string, text: string) => {
    return text.replace(/<post_slug>/g, slug);
};

const Post: FC<PostProps> = (props) => (
    <article className={cx('h-entry', props.className)}>
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(wrapSchmeaContext(getBlogPostJsonLd(props.post.attributes))),
                }}
            />
        </Head>
        <Link href={`/posts/${props.post.attributes.slug}`}>
            <a className="u-url">
                <h1 className="text-2xl md:text-3xl font-semibold p-name">{props.post.attributes.title}</h1>
            </a>
        </Link>
        <div className="text-sm font-light mb-4">
            <DateMeta
                published_at={props.post.attributes.published_at}
                updated_at={props.post.attributes.updated_at}
                authors={props.post.attributes.authors}
            />
            <TagList tags={props.post.attributes.keywords} />
        </div>
        <div className="p-summary hidden">{props.post.attributes.excerpt}</div>
        <Markdown
            className="x-post e-content"
            text={replaceTemplateVars(props.post.attributes.slug, props.post.body)}
        />
    </article>
);

export default Post;

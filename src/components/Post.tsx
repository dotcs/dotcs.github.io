import { FC } from 'react';
import { ParsedPost as PostType } from '../types';
import DateMeta from './DateMeta';
import Markdown from './Markdown';
import TagList from './TagList';

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
}

const Post: FC<PostProps> = (props) => (
    <div className={props.className}>
        <h1 className="text-2xl md:text-3xl font-semibold">{props.post.attributes.title}</h1>
        <div className="text-sm font-light mb-4">
            <DateMeta
                published_at={props.post.attributes.published_at}
                updated_at={props.post.attributes.updated_at}
                authors={props.post.attributes.authors}
            />
            <TagList tags={props.post.attributes.keywords} />
        </div>
        <Markdown className="x-post" text={replaceTemplateVars(props.post.attributes.slug, props.post.body)} />
    </div>
);

export default Post;

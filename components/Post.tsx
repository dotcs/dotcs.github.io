import { FC } from "react";
import { Post as PostType } from "../types";
import Markdown from "./Markdown";
import PostMeta from "./PostMeta";

export interface PostProps {
    post: PostType;
    className?: string;
};

const Post: FC<PostProps> = (props) => (
    <div className={props.className}>
        <h1 className="text-3xl font-semibold">{props.post.attributes.title}</h1>
        <PostMeta attributes={props.post.attributes} className="mb-4" />
        <Markdown className="x-post" text={props.post.body} />
    </div>
);

export default Post;

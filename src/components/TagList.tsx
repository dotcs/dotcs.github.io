import Link from 'next/link';
import { FC } from 'react';

export interface TagListProps {
    tags: string[];
    className?: string;
}

const TagList: FC<TagListProps> = (props) => (
    <aside className={props.className}>
        <i className="las la-tags inline-block mr-2 relative" style={{ top: 2 }}></i>
        <ul className="inline-block">
            {props.tags.map((item) => (
                <li key={item} className="inline-block mr-2">
                    <Link href="/tags/[slug]" as={'/tags/' + item}>
                        <a className="x-link p-category">{item}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </aside>
);

export default TagList;

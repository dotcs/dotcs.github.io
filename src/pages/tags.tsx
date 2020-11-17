import '../styles/index.css';

import { FC } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import PageCmp from '../components/Page';
import { TagCount, PageSettings } from '../types';
import { getTagCounts } from '../utils/parser';
import { pageSettings } from '../settings';

export interface TagsPageProps {
    tags: TagCount[];
    settings: PageSettings;
}

export const getStaticProps: GetStaticProps<TagsPageProps> = async () => {
    const tags = getTagCounts();
    return { props: { tags, settings: pageSettings } };
};

export const TagsPage: FC<TagsPageProps> = (props) => (
    <PageCmp settings={props.settings}>
        <div className="px-4 lg:px-24 py-4">
            <h1 className="text-3xl font-semibold mb-4">Tags</h1>
            <ul className="list-disc pl-8">
                {props.tags.map((tag) => (
                    <li key={tag.slug}>
                        <Link href="/tags/[slug]" as={'/tags/' + tag.slug}>
                            <a className="x-link">
                                {tag.slug} ({tag.count})
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </PageCmp>
);

export default TagsPage;

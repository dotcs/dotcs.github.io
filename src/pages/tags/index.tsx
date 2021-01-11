import '../../styles/index.css';

import { FC } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import PageCmp from '../../components/Page';
import { TagCount, PageSettings, TagInfoMap } from '../../types';
import { getTagCounts, getTagInfo } from '../../utils/parser';
import { pageSettings } from '../../settings';
import Markdown from '../../components/Markdown';

export interface TagsPageProps {
    tags: TagCount[];
    tagInfoMap: TagInfoMap;
    settings: PageSettings;
}

export const getStaticProps: GetStaticProps<TagsPageProps> = async () => {
    const tags = getTagCounts();
    const tagInfoMap = getTagInfo();
    return { props: { tags, tagInfoMap, settings: pageSettings } };
};

export const TagsPage: FC<TagsPageProps> = (props) => (
    <PageCmp settings={props.settings}>
        <main className="px-4 lg:px-24 py-4">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">Tags</h1>
            <ul className="list-disc pl-8">
                {props.tags.map((tag) => (
                    <li key={tag.slug} className="my-8">
                        <h3 className="mb-2">
                            <Link href="/tags/[slug]" as={'/tags/' + tag.slug}>
                                <a className="x-link mr-1 text-lg font-semibold">{tag.slug}</a>
                            </Link>
                            <span className="bg-gray-300 rounded-full px-1 mr-2">{tag.count}</span>
                            <a href={`/feeds/tags/${tag.slug}.xml`} title="Link to atom feed" className="x-link-alt"><i className="las la-rss" /></a>
                        </h3>
                        {props.tagInfoMap[tag.slug] && (
                            <Markdown text={props.tagInfoMap[tag.slug].description} className="x-post" />
                        )}
                    </li>
                ))}
            </ul>
        </main>
    </PageCmp>
);

export default TagsPage;

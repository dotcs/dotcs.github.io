import '../../styles/index.css';

import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { ParsedUrlQuery } from 'querystring';

import PageCmp from '../../components/Page';
import { PostItem } from '../../components/PostItem';
import { PageSettings, ParsedPost, TagInfo } from '../../types';
import { getAllTags, getPostsByTag, getTagInfo } from '../../utils/parser';
import { pageSettings } from '../../settings';
import { getBreadcrumbTag, wrapSchmeaContext } from '../../utils/schema';
import Markdown from '../../components/Markdown';

interface StaticParams extends ParsedUrlQuery {
    slug: string;
}

export interface TagPageProps {
    tag: string;
    tagInfo: TagInfo;
    posts: ParsedPost[];
    settings: PageSettings;
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
    const paths = getAllTags().map((slug) => ({ params: { slug } }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<TagPageProps, StaticParams> = async ({ params }) => {
    const posts = getPostsByTag(params!.slug);
    posts.reverse();
    const tagInfo = getTagInfo()[params!.slug];
    return {
        props: { tag: params!.slug, tagInfo, posts, settings: pageSettings },
    };
};

export const TagPage: FC<TagPageProps> = (props) => {
    if (!props.tag) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <>
            <Head>
                <meta property="og:title" content={props.tag} />
                <meta property="og:description" content={'Posts that are tagged with: ' + props.tag} />
                <meta property="og:url" content={`${props.settings.baseUrl}/tags/${props.tag}`} />
                <title>
                    Tag: {props.tag} - {props.settings.title}
                </title>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(wrapSchmeaContext(getBreadcrumbTag(props.tag))) }}
                />
            </Head>
            <PageCmp settings={props.settings}>
                <main className="px-4 lg:px-24 py-4">
                    <h1 className="text-xl mt-2 mb-2">
                        <span className="mr-2 text-gray-700">Tag:</span>{' '}
                        <span className="bg-gray-300 p-1 rounded font-bold">{props.tag}</span>
                    </h1>
                    <Markdown rootEl='aside' text={props.tagInfo.description} className="x-post mb-8 italic" />
                    {props.posts.map((post) => (
                        <PostItem key={post.attributes.slug} {...post} />
                    ))}
                </main>
            </PageCmp>
        </>
    );
};

export default TagPage;

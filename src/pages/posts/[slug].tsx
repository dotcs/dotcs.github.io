import '../../styles/index.css';
import 'highlight.js/styles/vs.css';

import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import PageCmp from '../../components/Page';
import { PageSettings, Post as PostType } from '../../types';
import { getAllPosts, getAllPostSlugs } from '../../utils/parser';
import { pageSettings } from '../../settings';
import Post from '../../components/Post';

interface StaticParams extends ParsedUrlQuery {
    slug: string;
}

export interface PageProps {
    post: PostType;
    settings: PageSettings;
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
    const paths = getAllPostSlugs().map((slug) => ({ params: { slug } }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({ params }) => {
    const post = getAllPosts().find((p) => p.attributes.slug === params.slug);
    return {
        props: { post, settings: pageSettings },
    };
};

export const Page: FC<PageProps> = ({ post, settings }) => (
    <>
        <Head>
            <meta property="og:title" content={post.attributes.title} />
            {post.attributes.excerpt && <meta property="og:description" content={post.attributes.excerpt} />}
            <meta property="og:url" content={`${settings.baseUrl}/pages/${post.attributes.slug}`} />
            {/*
          <meta property="og:image" content="" />
          <meta property="og:image:width" content="" />
          <meta property="og:image:height" content="" />
          */}

            <title>
                {post.attributes.title} - {settings.title}
            </title>
        </Head>
        <PageCmp settings={settings}>
            <Post className="px-4 lg:px-24 py-4" post={post} />
        </PageCmp>
    </>
);

export default Page;

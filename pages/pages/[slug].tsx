import '../../styles/index.css'

import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head';
import ErrorPage from 'next/error';
import { ParsedUrlQuery } from 'querystring';

import { Page as PageCmp } from '../../components/page/page';
import { PageSettings, Post } from '../../types';
import { getAllPages, getAllPageSlugs, getAllPosts } from '../../utils/parser';
import { pageSettings } from '../../content/settings';
import { settings } from 'cluster';
import Markdown from '../../components/Markdown';

interface StaticParams extends ParsedUrlQuery {
  slug: string;
}

export interface PageProps {
    page: Post;
    settings: PageSettings;
}

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//     const { settings } = await fetchSettings();
//     const { slug } = query;
//     const { pages } = await fetchBackend(`/content/pages/slug/${slug}`);
//     if (!pages) {
//         return { props: { page: null, settings } };
//     }
//     return { props: { page: pages[0], settings } };
// }

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const paths = getAllPageSlugs().map(slug => ({ params: { slug }}));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({ params }) => {
  const page = getAllPages().find(p => p.attributes.slug === params.slug);
  return {
    props: { page, settings: pageSettings }
  };
}

export const Page: FC<PageProps> = ({ page, settings }) => (
    <>
        <Head>
            <meta property="og:title" content={page.attributes.title} />
            {page.attributes.excerpt && 
                <meta property="og:description" content={page.attributes.excerpt} />
            }
            <meta property="og:url" content={`${settings.baseUrl}/pages/${page.attributes.slug}`} />
            {/*
            <meta property="og:image" content="" />
            <meta property="og:image:width" content="" />
            <meta property="og:image:height" content="" />
            */}

            <title>{page.attributes.title} - {settings.title}</title>
        </Head>
        <PageCmp settings={settings}>
            <div className="px-4 lg:px-24 py-4">
                <h1 className="text-3xl font-bold mb-4">{page.attributes.title}</h1>
                <Markdown className="x-post" text={page.body} />
            </div>
        </PageCmp>
    </>
);

export default Page;
import '../../styles/index.css'
import 'highlight.js/styles/vs.css';

import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import { Page as PageCmp } from '../../components/page/page';
import { PageSettings, Post } from '../../types';
import useScript from '../../hooks/useScript';
import useCSS from '../../hooks/useCSS';
import { getAllPosts, getAllPostSlugs } from '../../utils/parser';
import { pageSettings } from '../../content/settings';
import Markdown from '../../components/Markdown';

interface StaticParams extends ParsedUrlQuery {
  slug: string;
}

export interface PageProps {
  post: Post;
  settings: PageSettings;
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const paths = getAllPostSlugs().map(slug => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({ params }) => {
  const post = getAllPosts().find(p => p.attributes.slug === params.slug);
  return {
    props: { post, settings: pageSettings }
  };
}

export const Page: FC<PageProps> = ({ post, settings }) => (
  <>
    <Head>
      <meta property="og:title" content={post.attributes.title} />
      {/* {post.excerpt && 
              <meta property="og:description" content={post.excerpt} />
          } */}
      <meta property="og:url" content={`${settings.baseUrl}/pages/${post.attributes.slug}`} />
      {/*
          <meta property="og:image" content="" />
          <meta property="og:image:width" content="" />
          <meta property="og:image:height" content="" />
          */}

      <title>{post.attributes.title} - {settings.title}</title>
    </Head>
    <PageCmp settings={settings}>
      <div className="px-4 lg:px-24 py-4">
        <h1 className="text-3xl font-semibold">{post.attributes.title}</h1>
        <p className="font-thin mb-4 text-sm">posted on {post.attributes.published_at.substr(0, '2000-01-01'.length)} by {post.attributes.authors.join(', ')}</p>
        <Markdown className="x-post" text={post.body} />
      </div>
    </PageCmp>
  </>
);

export default Page;


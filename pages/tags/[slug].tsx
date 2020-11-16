import '../../styles/index.css'

import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head';
import ErrorPage from 'next/error';
import { ParsedUrlQuery } from 'querystring';

import { Page } from '../../components/page/page';
import { PostItem } from '../../components/postItem/postItem';
import { PageSettings, Post } from '../../types';
import { getAllTags, getPostsByTag } from '../../utils/parser';
import { pageSettings } from '../../content/settings';

interface StaticParams extends ParsedUrlQuery {
  slug: string;
}

export interface TagPageProps {
  tag: string;
  posts: Post[];
  settings: PageSettings;
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const paths = getAllTags().map(slug => ({ params: { slug }}));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TagPageProps, StaticParams> = async ({ params }) => {
  const posts = getPostsByTag(params.slug);
  posts.reverse();
  return {
    props: { tag: params.slug, posts, settings: pageSettings }
  };
}

export const TagPage: FC<TagPageProps> = (props) => {
  if (!props.tag) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <Head>
          <meta property="og:title" content={props.tag} />
          {/* {page.excerpt && 
              <meta property="og:description" content={page.excerpt} />
          } */}
          <meta property="og:url" content={`${props.settings.baseUrl}/tags/${props.tag}`} />
          {/*
          <meta property="og:image" content="" />
          <meta property="og:image:width" content="" />
          <meta property="og:image:height" content="" />
          */}

          <title>Tag: {props.tag} - {props.settings.title}</title>
      </Head>
      <Page settings={props.settings}>
        <div className="px-4 lg:px-24 py-4">
            <h1 className="text-xl mt-2 mb-8">Tag: <span className="">{props.tag}</span></h1>
            {props.posts.map(post => <PostItem key={post.attributes.slug} {...post} />)}
        </div>
      </Page>
    </>
  );
}

export default TagPage;


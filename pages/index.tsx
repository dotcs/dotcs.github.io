import '../styles/index.css'

import { FC } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next'

import { Page as PageCmp } from '../components/page/page';
import { PostItem, PostItemProps } from '../components/postItem/postItem';
import { PageSettings, Post } from '../types';
import { getAllPosts } from '../utils/parser';
import { pageSettings } from '../content/settings';

export interface PageProps {
  posts: PostItemProps[];
  settings: PageSettings;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const posts = getAllPosts()
    .map(({attributes, ...rest}) => ({ attributes }));  // keep only the attributes
  posts.reverse();
  return {
    props: { posts, settings: pageSettings }
  };
}

export const Page: FC<PageProps> = (props) => (
  <>
    <Head>
      <meta property="og:description" content={props.settings.description} />
      <title>dotcs - Weblog</title>
    </Head>
    <PageCmp settings={props.settings}>
      <div className="px-4 lg:px-24 py-4">
        {props.posts.map(post => <PostItem key={post.attributes.slug} {...post} />)}
      </div>
    </PageCmp>
  </>
);

export default Page;
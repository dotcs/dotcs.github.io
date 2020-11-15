import '../styles/index.css'

import { FC } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring';

import { Page as PageCmp } from '../components/page/page';
import { PostItem } from '../components/postItem/postItem';
import { GhostContentSettings, PageSettings, Post } from '../types';
import { getAllPosts } from '../utils/parser';
import { pageSettings } from '../content/settings';

export interface PageProps {
  posts: Post[];
  settings: PageSettings;
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { settings } = await fetchSettings();
//   const { posts, meta } = await fetchBackend('/content/posts', { include: ['authors', 'tags'] });
//   return { props: { posts, pagination: meta.pagination, settings } };
// }

// export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
//   const paths = getAllSlugs().map(slug => ({ params: { slug }}));
//   return {
//     paths,
//     fallback: false,
//   };
// };

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const posts = getAllPosts();
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
import '../../styles/index.css'

import { FC } from 'react';
import { GetServerSideProps } from 'next'
import Head from 'next/head';
import ErrorPage from 'next/error';

import { Page } from '../../components/page/page';
import { PostItem } from '../../components/postItem/postItem';
import { fetchBackend, fetchSettings } from '../../utils';
import { GhostTag, GhostPagination, GhostPost, GhostContentSettings } from '../../types';

export interface TagPageProps {
  tag: GhostTag;
  posts: GhostPost[];
  pagination: GhostPagination;
  settings: GhostContentSettings;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { settings } = await fetchSettings();
  const { slug } = query;
  const { tags } = await fetchBackend(`/content/tags/slug/${slug}`, { include: ['count.posts'] });
  const { posts, meta } = await fetchBackend('/content/posts', {filter: `tag:${slug}`, include: ['authors', 'tags']})
  if (!tags) {
    return { props: { tag: null, posts: [], pagination: null, settings }};
  }
  return { props: { tag: tags[0], posts, pagination: meta.pagination, settings } };
}

export const TagPage: FC<TagPageProps> = (props) => {
  if (!props.tag) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <Head>
          <meta property="og:title" content={props.tag.name} />
          {/* {page.excerpt && 
              <meta property="og:description" content={page.excerpt} />
          } */}
          <meta property="og:url" content={`${props.settings.url}/tags/${props.tag.slug}`} />
          {/*
          <meta property="og:image" content="" />
          <meta property="og:image:width" content="" />
          <meta property="og:image:height" content="" />
          */}

          <title>Tag: {props.tag.name} - dotcs.me</title>
      </Head>
      <Page settings={props.settings}>
        <div className="px-4 lg:px-24 py-4">
            <h1 className="text-xl mt-2 mb-8">Tag: <span className="">{props.tag.name}</span></h1>
            {props.posts.map(post => <PostItem key={post.slug} post={post} />)}
        </div>
      </Page>
    </>
  );
}

export default TagPage;


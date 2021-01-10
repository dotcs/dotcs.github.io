import '../../styles/index.css';

import { FC } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';

import PageCmp from '../../components/Page';
import { PostItem, PostItemProps } from '../../components/PostItem';
import { PageSettings } from '../../types';
import { getAllPosts } from '../../utils/parser';
import { pageSettings } from '../../settings';
import { getPostsWebPage, wrapSchmeaContext } from '../../utils/schema';

export interface PageProps {
    posts: PostItemProps[];
    settings: PageSettings;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const posts = getAllPosts().map(({ attributes }) => ({ attributes })); // keep only the attributes
    posts.reverse();
    return {
        props: { posts, settings: pageSettings },
    };
};

export const Page: FC<PageProps> = (props) => (
    <>
        <Head>
            <meta property="og:description" content={props.settings.description} />
            <title>{props.settings.title} - Weblog</title>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(wrapSchmeaContext(getPostsWebPage())) }}
            />
        </Head>
        <PageCmp settings={props.settings}>
            <div className="px-4 lg:px-24 py-4">
                {props.posts.map((post) => (
                    <PostItem key={post.attributes.slug} {...post} />
                ))}
            </div>
        </PageCmp>
    </>
);

export default Page;

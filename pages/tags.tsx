import '../styles/index.css'

import { FC } from 'react';
import { GetServerSideProps, GetStaticProps } from 'next'

import { Page } from '../components/page/page';
import { fetchBackend, fetchSettings } from '../utils';
import { GhostTag, GhostPagination, GhostContentSettings } from '../types';
import { TagPageProps } from './tags/[slug]';

export interface TagsPageProps {
  tags: GhostTag[];
  pagination: GhostPagination;
  settings: GhostContentSettings;
}

export const getStaticProps: GetStaticProps<TagPageProps> = async () => {
  const fm = require('front-matter');
  const fs = require('fs');
  return {
    props: 
  }
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { settings } = await fetchSettings();
  const { tags, meta } = await fetchBackend('/content/tags', { include: ['count.posts'] });
  return { props: { tags, pagination: meta.pagination, settings } };
}

export const TagsPage: FC<TagsPageProps> = (props) => (
  <Page settings={props.settings}>
    <div className="px-4 lg:px-24 py-4">
        <h1 className="text-3xl font-semibold mb-4">Tags</h1>
        <ul className="list-disc pl-8">
            {props.tags.map(tag => <li key={tag.slug}><a href="#" className="x-link">{tag.name} ({tag.count!.posts})</a></li>)}
        </ul>
    </div>
  </Page>
);

export default TagsPage;

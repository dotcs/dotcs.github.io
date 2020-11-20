import { FC } from 'react';
import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';
import { PageSettings } from '../types';
import useCSS from '../hooks/useCSS';
import Container from './Container';

export interface PageProps {
    settings: PageSettings;
}

const Page: FC<PageProps> = (props) => {
    useCSS('/fonts/line-awesome/1.3.0/css/line-awesome.min.css');

    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="theme-color" content={props.settings.themeColor} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content={props.settings.title} />
                <meta property="og:type" content="website" />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title={props.settings.title}
                    href={`${props.settings.baseUrl}/feeds/rss`}
                ></link>
                <link rel="me" href={'https://github.com/' + props.settings.githubHandle} />
                <link rel="me" href={'https://twitter.com/' + props.settings.twitterHandle} />
            </Head>
            <div className="flex flex-col h-screen">
                <Header />
                <Container className="bg-white flex-grow">{props.children}</Container>
                <Footer />
            </div>
        </>
    );
};

export default Page;
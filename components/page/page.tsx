import { FC } from 'react';
import Head from 'next/head';

import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { PageSettings } from '../../types';
import useCSS from '../../hooks/useCSS';

export interface PageProps {
    settings: PageSettings;
}

export const Page: FC<PageProps> = (props) => {
    useCSS('/fonts/line-awesome/1.3.0/css/line-awesome.min.css');

    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="theme-color" content="#38b2ac" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content={props.settings.title} />
                <meta property="og:type" content="website" />
                <link rel="alternate" type="application/rss+xml" title="dotcs.me" href={`${props.settings.baseUrl}/feeds/rss`}></link>
                <link rel="me" href="https://github.com/dotcs" />
                <link rel="me" href="https://twitter.com/dotcsDE" />
            </Head>
            <div className="flex flex-col h-screen">
                <Header />
                <div className="bg-white container mx-auto flex-grow">
                    {props.children}
                </div>
                <Footer />
            </div>
        </>
    );
}

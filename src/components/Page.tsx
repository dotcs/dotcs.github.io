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
                <meta property="og:image" content={props.settings.baseUrl + '/og-default-image.png'} />
                <meta property="og:image:width" content="1920" />
                <meta property="og:image:height" content="630" />
                <link
                    rel="alternate"
                    type="application/atom+xml"
                    title={props.settings.title}
                    href={`${props.settings.baseUrl}/feeds/`}
                ></link>
                <link rel="me" href={'https://github.com/' + props.settings.githubUserHandle} />
                {props.settings.twitterUserHandle !== null && (
                    <link rel="me" href={'https://twitter.com/' + props.settings.twitterUserHandle} />
                )}
                {props.settings.mastodonHandles.map((v) => (
                    <link
                        key={v.instanceBaseUrl + v.userHandle}
                        rel="me"
                        href={`${v.instanceBaseUrl}/@${v.userHandle}`}
                    />
                ))}
                <link rel="webmention" href={props.settings.webmentionUrl} />
                <link rel="pingback" href={props.settings.pingbackUrl} />
            </Head>
            <div className="flex flex-col h-screen">
                <Header />
                <Container className="bg-white flex-grow">{props.children}</Container>
                <Footer buildTimestamp={props.settings.buildInformation.timestamp} />
            </div>
            <script
                src="https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js"
                type="text/javascript"
                crossOrigin="anonymous"
                integrity="sha384-rbtjAdnIQE/aQJGEgXrVUlMibdfTSa4PQju4HDhN3sR2PmaKFzhEafuePsl9H/9I"
            ></script>
        </>
    );
};

export default Page;

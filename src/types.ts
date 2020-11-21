import { FrontMatterResult } from 'front-matter';

/** Defines the type of any possible content piece. */
export type ContentType = 'post' | 'page';

interface PostAttributesInternal {
    title: string;
    excerpt: string;
    keywords: string[];
    authors: string[];
    published_at: string;
    updated_at: string;
}

/**
 * Defines the attributes of a post.
 *
 * Attributes are all values that are set via frontmatter in markdown plus some
 * additional values, such as the slug.
 */
export interface PostAttributes extends PostAttributesInternal {
    slug: string;
}

/**
 * Defines a parsed post object which includes the markdown and HTML code as
 * well its attributes.
 */
export type ParsedPost = FrontMatterResult<PostAttributes>;

export interface TagCount {
    slug: string;
    count: number;
}

export interface PageSettings {
    /**
     * Title of the website.
     *
     * Is used amonst other things in the HTML head title tag.
     */
    title: string;

    /**
     * Base URL of the website.
     *
     * Should be in the form: `https?://hostname.tld`.
     * If the website supports TLS use `https://` for the protocol.
     */
    baseUrl: string;

    /**
     * Main purpose of the website.
     *
     * Is used amonst other things in the HTML head meta information tag(s).
     */
    description: string;

    /**
     * Reference to a twitter handle.
     *
     * E.g. for the linux foundation (https://twitter.com/linuxfoundation)
     * the twitter handle would be `linuxfoundation`.
     */
    twitterHandle: string;

    /** Reference to a GitHub handle. */
    githubHandle: string;

    /**
     * Reference to the fosstodon instance.
     *
     * E.g. for dotcs (https://fosstodon.org/@dotcs) the handle would be
     * `dotcs`.
     */
    fosstodonHandle: string;

    /** Theme color as RBG value, e.g. `#ffffff`. */
    themeColor: string;
}

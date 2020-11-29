import { mainHCard, pageSettings } from "../settings";
import { PostAttributes, ContentType } from "../types";

// Useful tool for validation: https://search.google.com/structured-data/testing-tool

/** Helper to wrap the schema.org context information to JSON-LD objects. */
export const wrapSchmeaContext = (obj: object) => ({
    "@context": "https://schema.org",
    ...obj,
});

/** Default image of this website as JSON-LD object. */
export const getDefaultImage = (): object => ({
    "@type": "ImageObject",
    url: pageSettings.baseUrl + '/og-default-image.png',
    width: 1200,
    height: 630,
});

/** JSON-LD information of the root page. */
export const getMainWebPage = (): object => ({
    "@type": "WebPage",
    headline: pageSettings.description,
    mainEntityOfPage: pageSettings.baseUrl,
    name: pageSettings.title,
    publisher: getOrganization(),
    url: pageSettings.baseUrl,
});

/** JSON-LD information of the page overview page (/pages). */
export const getPostsWebPage = (): object => ({
    "@type": "WebPage",
    headline: `Posts - ${pageSettings.description}`,
    mainEntityOfPage: `${pageSettings.baseUrl}/posts`,
    name: pageSettings.title,
    publisher: getOrganization(),
    url: `${pageSettings.baseUrl}/posts`,
});

/** JSON-LD information of a single blog post. */
export const getBlogPostJsonLd = (postAttr: PostAttributes): object => {
    const url = pageSettings.baseUrl + '/posts' + postAttr.slug;
    return {
        "@type": "BlogPosting",
        "@id": url,
        url: url,
        headline: postAttr.title,
        description: postAttr.excerpt,
        keywords: postAttr.keywords,
        isAccessibleForFree: true,
        image: getDefaultImage(),
        author: getPerson(),
        dateCreated: postAttr.published_at,
        datePublished: postAttr.published_at,
        dateModified: postAttr.updated_at,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        publisher: getOrganization(),
        license: "https://creativecommons.org/licenses/by-sa/4.0/"
    }
};

/** JSON-LD information about the main author. */
export const getPerson = (): object => ({
    "@type": "Person",
    "name": mainHCard.name,
    "givenName": mainHCard.givenName,
    "familyName": mainHCard.familyName,
    "email": mainHCard.email,
    "honorificPrefix": mainHCard.honorificPrefix,
});

/** JSON-LD information about the organization of this blog. */
export const getOrganization = (): object => ({
    "@type": "Organization",
    "name": pageSettings.title,
    "logo": getDefaultImage() 
});

/** JSON-LD breadcumb information of a single post. */
export const getBreadcrumbPost = (postAttr: PostAttributes): object => ({
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Posts",
    "item": `${pageSettings.baseUrl}/posts`,
  },{
    "@type": "ListItem",
    "position": 2,
    "name": postAttr.title,
    "item": `${pageSettings.baseUrl}/posts/${postAttr.slug}`
  }]
});

export const getBreadcrumbTag = (tagSlug: string): object => ({
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Tags",
    "item": `${pageSettings.baseUrl}/tags`,
  },{
    "@type": "ListItem",
    "position": 2,
    "name": tagSlug,
    "item": `${pageSettings.baseUrl}/tags/${tagSlug}`
  }]
});

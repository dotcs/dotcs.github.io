import { mainHCard, pageSettings } from "../settings";
import { PostAttributes } from "../types";

// Useful tool for validation: https://search.google.com/structured-data/testing-tool

export const wrapSchmeaContext = (obj: object) => ({
    "@context": "https://schema.org",
    ...obj,
});

export const getDefaultImage = (): object => ({
    "@type": "ImageObject",
    url: pageSettings.baseUrl + '/og-default-image.png',
    width: 1200,
    height: 630,
});

export const getMainWebPage = (): object => ({
    "@type": "WebPage",
    headline: pageSettings.description,
    mainEntityOfPage: pageSettings.baseUrl,
    name: pageSettings.title,
    publisher: {
        '@type': "Organization",
        logo: getDefaultImage(),
        name: pageSettings.title,
    },
    url: pageSettings.baseUrl,
});

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

export const getPerson = (): object => ({
    "@type": "Person",
    "name": mainHCard.name,
    "givenName": mainHCard.givenName,
    "familyName": mainHCard.familyName,
    "email": mainHCard.email,
    "honorificPrefix": mainHCard.honorificPrefix,
});

export const getOrganization = (): object => ({
    "@type": "Organization",
    "name": pageSettings.title,
    "logo": getDefaultImage() 
});

import { mainHCard, pageSettings } from "../settings";
import { PostAttributes } from "../types";

// Useful tool for validation: https://search.google.com/structured-data/testing-tool

export const wrapSchmeaContext = (obj: object) => ({
    "@context": "https://schema.org",
    ...obj,
});

export const getBlogPostJsonLd = (postAttr: PostAttributes): object => ({
    "@type": "BlogPosting",
    "@id": pageSettings.baseUrl + '/posts' + postAttr.slug,
    "headline": postAttr.title,
    "description": postAttr.excerpt,
    "image": {
        "@type": "ImageObject",
        "url": pageSettings.baseUrl + '/og-default-image.png',
        "width": 1200,
        "height": 630,
    },
    "author": getPerson(),
    "datePublished": postAttr.published_at,
    "dateModified": postAttr.updated_at,
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": pageSettings.baseUrl,
    },
    "publisher": getOrg(),
    "license": "https://creativecommons.org/licenses/by-sa/4.0/"
});

export const getPerson = (): object => ({
    "@type": "Person",
    "name": mainHCard.name,
    "givenName": mainHCard.givenName,
    "familyName": mainHCard.familyName,
    "email": mainHCard.email,
    "honorificPrefix": mainHCard.honorificPrefix,
    "brand": getOrg,
});

export const getOrg = (): object => ({
    "@type": "Organization",
    "name": "dotcs",
    "logo": {
        "@type": "ImageObject",
        "url": pageSettings.baseUrl + '/og-default-image.png',
        "width": 1200,
        "height": 630,
    }
});
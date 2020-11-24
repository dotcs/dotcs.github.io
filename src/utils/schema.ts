import { mainHCard, pageSettings } from "../settings";
import { ParsedPost } from "../types";

// Useful tool for validation: https://search.google.com/structured-data/testing-tool

export const getBlogPostJsonLd = (post: ParsedPost): object => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": pageSettings.baseUrl + '/posts' + post.attributes.slug,
    "headline": post.attributes.title,
    "description": post.attributes.excerpt,
    "image": {
        "@type": "ImageObject",
        "url": pageSettings.baseUrl + '/og-default-image.png',
        "width": 1200,
        "height": 630,
    },
    "author": getPerson(),
    "datePublished": post.attributes.published_at,
    "dateModified": post.attributes.updated_at,
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
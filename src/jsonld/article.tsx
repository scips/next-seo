import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import formatAuthorName from '../utils/formatAuthorName';
import { buildArticleAuthor } from '../utils/buildArticle';
import { ArticleAuthor, ArticlePublisher } from 'src/types';

export interface ArticleJsonLdProps {
  keyOverride?: string;
  url: string;
  title: string;
  images: ReadonlyArray<string>;
  datePublished: string;
  dateModified?: string;
  authors: ArticleAuthor | ArticleAuthor[];
  publisher: ArticlePublisher;
  authorName: string | string[];
  description: string;
  publisherName: string;
  publisherLogo: string;
}

const ArticleJsonLd: FC<ArticleJsonLdProps> = ({
  keyOverride,
  url,
  title,
  images = [],
  datePublished,
  dateModified = null,
  authors,
  authorName,
  description,
  publisherName,
  publisherLogo,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${title}",
    "image": [
      ${images.map(image => `"${image}"`)}
     ],
    "datePublished": "${datePublished}",
    "dateModified": "${dateModified || datePublished}",
    ${
      authors
        ? `"author": ${
            Array.isArray(authors)
              ? `[${authors.map(author => `${buildArticleAuthor(author)}`)}]`
              : buildArticleAuthor(authors)
          },`
        : ''
    }
    ${
      authorName && !authors ? `"author": ${formatAuthorName(authorName)},` : ''
    }
    "publisher": {
      "@type": "Organization",
      "name": "${publisherName}",
      "logo": {
        "@type": "ImageObject",
        "url": "${publisherLogo}"
      }
    },
    "description": "${description}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-article${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default ArticleJsonLd;

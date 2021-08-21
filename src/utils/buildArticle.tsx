import {
  ArticleAuthor,
  ArticlePublisher,
  ArticlePublisherLogo,
} from '../types';

export const buildArticleAuthors = (authors: ArticleAuthor[]) =>
  authors.map(author => buildArticleAuthor(author));

export const buildArticleAuthor = (author: ArticleAuthor) => `
  {
      "@type": "${author.type}",
      "name": "${author.name}",
      "url": "${author.url}"
  }
`;

export const buildArticlePublisher = (
  publisher: ArticlePublisher,
  publisherLogo: ArticlePublisherLogo,
) => `
  "publisher": {
      "@type": "${publisher.type}",
      "name": "${publisher.name}",
      "logo": {
        "@type": "${publisherLogo.type}",
        "url": "${publisherLogo.url}"
      }
  },
`;

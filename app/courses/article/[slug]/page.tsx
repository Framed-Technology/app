import React from "react";
import { readArticleBySlug } from "./actions";

type Props = {
  params: {
    slug: string;
  };
};

const Article = async ({ params }: Props) => {
  const slug = params.slug;
    const articleResponse = await readArticleBySlug(slug)
    const articles = articleResponse.data
    if (articles.length === 0) {
      return <>404</>
    }
    const article = articles[0].attributes
  return <div>Article: <pre>{JSON.stringify(article, null, 2)}</pre></div>;
};

export default Article;
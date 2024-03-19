import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const Article = ({ params }: Props) => {
  const slug = params.slug;
  return <div>Article: {slug}</div>;
};

export default Article;

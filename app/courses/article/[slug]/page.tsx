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

// "use client"

// import React from "react";
// import { Article as ArticleProps } from "@/api/types"; // Import the ArticleProps type
// import { useClient } from "next/data-client"; // Import the useClient hook

// type Props = {
//   params: {
//     slug: string;
//   };
// };

// const fetchContentBySlug = async (slug: string): Promise<ArticleProps | null> => {
//   try {
//     // Perform API call to fetch content based on the provided slug
//     // Replace this with your actual API call
//     const response = await fetch(`/api/articles/${slug}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch article");
//     }
//     const article: ArticleProps = await response.json();
//     return article;
//   } catch (error) {
//     console.error("Error fetching article:", error);
//     return null;
//   }
// };

// const Article = ({ params }: Props) => {
//   const { slug } = params;
//   const { data: article, isLoading, isError } = useClient(fetchContentBySlug, slug); // Use the useClient hook

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (isError || !article) {
//     return <p>Error fetching article.</p>;
//   }

//   return (
//     <div>
//       <h1>Article: {slug}</h1>
//       <h2>{article.title}</h2>
//       <p>{article.content}</p>
//       {/* Render other properties of the article as needed */}
//     </div>
//   );
// };

// export default Article;

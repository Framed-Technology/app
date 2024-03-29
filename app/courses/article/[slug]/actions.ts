import { strapi } from "@/api";
import { Article, StrapiContentResponse } from "@/api/types";

export const readArticleBySlug = async (slug: string): Promise<
  StrapiContentResponse<Article>
> => {
  const res = await strapi.get("/api/articles", {
    params: {
        "filters[slug][$eq]": slug,
        "populate": "*",
        "sort": "publishedAt:desc"
      },
  });
  return res.data;
};
"use server";

import { strapi } from "@/api";
import { Article, StrapiContentResponse } from "@/api/types";

export const readArticles = async (): Promise<
  StrapiContentResponse<Article>
> => {
  const res = await strapi.get("/api/articles?sort=publishedAt:desc");
  return res.data;
};

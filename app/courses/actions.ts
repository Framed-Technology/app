"use server";

import { strapi } from "@/api";
import { Article, Path, StrapiContentResponse } from "@/api/types";

export const readArticles = async (): Promise<
  StrapiContentResponse<Article>
> => {
  const res = await strapi.get("/api/articles?sort=publishedAt:desc");
  return res.data;
};

export const readPaths = async (): Promise<StrapiContentResponse<Path>> => {
  const res = await strapi.get("/api/paths?sort=publishedAt:desc&populate=*");
  return res.data;
};

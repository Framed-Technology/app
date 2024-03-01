"use server";

import { strapi } from "@/api";
import { Article, StrapiContentResponse } from "@/api/types";

export const readArticleById = async (
  id: number
): Promise<StrapiContentResponse<Article>> => {
  const res = await strapi.get("/api/articles", {
    params: {
      "filters[id][$eq]": id,
    },
  });
  return res.data;
};

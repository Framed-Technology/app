"use server";

import { strapi } from "@/api";
import { Path, StrapiContentResponse } from "@/api/types";

export const readPathBySlug = async (
  slug: string
): Promise<StrapiContentResponse<Path>> => {
  const res = await strapi.get("/api/paths", {
    params: {
      "filters[slug][$eq]": slug,
      "populate": "*",
    },
  });
  return res.data;
};

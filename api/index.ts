import axios from "axios";

export const strapi = axios.create({
  baseURL: process.env.STRAPI_URL,
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
});

export const tools = axios.create({
  baseURL: process.env.TOOLS_URL,
});


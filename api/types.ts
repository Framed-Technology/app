export type StrapiContentResponse<T> = {
  data: {
    id: number;
    attributes: T;
  }[];
};

type Content = {
  publishedAt: string;
};

export type Article =
  | {
      title: string;
      description: string;
      articleMarkdown: string;
      thumbnail?: any;
      authorAvatar?: any;
    }
  & Content;

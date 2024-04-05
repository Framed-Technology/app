import platypusLogo from "../../public/platypus.svg";

export type StrapiContentResponse<T> = {
  data: {
    id: number;
    attributes: T;
  }[];
};

export type Content = {
  publishedAt: string;
};

type PathLevel = "Level 1" | "Level 2" | "Level 3";

export type Path =
  | {
      slug: string;
      title: string;
      description: string;
      level: PathLevel;
      isFree: boolean;
      image?: any;
      articles?: StrapiContentResponse<Article>
    } & Content;

export type Article =
  | {
      slug: string;
      pathSlug: string;
      index: number;
      title: string;
      subTitle: string;
      description: string;
      content: string;
      minsToRead?: number;
      thumbnail?: any;
      authorAvatar?: any;
      authorName?: string;
    } & Content;

export type Post =
  | {
      slug: string;
      title: string;
      subTitle: string;
      description: string;
      content: string;
      minsToRead?: number;
      thumbnail?: any;
      authorAvatar?: any;
      authorName?: string;
    } & Content;


export type Blog = Article | Post

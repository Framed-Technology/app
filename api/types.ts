export type StrapiContentResponse<T> = {
    data: {
        id: number,
        attributes: T
    }[]
}

export type Article = {
  Title: string;
  Content: string;
  Image?: any;
  publishedAt: string;
};

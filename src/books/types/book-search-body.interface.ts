export interface BookSearchBody {
  id: number;
  title: string;
  price: number;
  releaseDate: string;
  author: string;
}

export interface BookSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: BookSearchBody;
    }>;
  };
}

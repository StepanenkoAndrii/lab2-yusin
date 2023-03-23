import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Book } from './entities/book.entity';
import { BookSearchBody } from './types/book-search-body.interface';

@Injectable()
export default class BooksSearchService {
  index = 'books';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexBook(book: Book) {
    return this.elasticsearchService.index({
      index: this.index,
      document: book,
    });
  }

  async search(text: string) {
    const result = await this.elasticsearchService.search<BookSearchBody>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['title', 'author'],
          },
        },
      },
    });
    const hits = result.hits.hits;
    return hits.map((item) => item._source);
  }

  async remove(bookId: number) {
    this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: bookId,
          },
        },
      },
    });
  }

  async termSearch(term: number) {
    const result = await this.elasticsearchService.search<BookSearchBody>({
      index: this.index,
      body: {
        query: {
          term: {
            price: {
              value: term,
              boost: 1.0,
            },
          },
        },
      },
    });
    const hits = result.hits.hits;
    return hits.map((item) => item._source);
  }

  async rangeSearch(gte: string, lte: string) {
    const result = await this.elasticsearchService.search<BookSearchBody>({
      index: this.index,
      body: {
        query: {
          range: {
            releaseDate: {
              gte,
              lte,
              boost: 1.0,
            },
          },
        },
      },
    });
    const hits = result.hits.hits;
    return hits.map((item) => item._source);
  }

  async regexpSearch(title: string) {
    const result = await this.elasticsearchService.search<BookSearchBody>({
      index: this.index,
      body: {
        query: {
          regexp: {
            title: {
              value: title,
              flags: 'ALL',
              case_insensitive: true,
              max_determinized_states: 10000,
            },
          },
        },
      },
    });
    const hits = result.hits.hits;
    return hits.map((item) => item._source);
  }

  ////////////////////////////////////////////////////////////////

  async matchStandardSearch(description: string) {
    const result = await this.elasticsearchService.search<BookSearchBody>({
      index: this.index,
      body: {
        query: {
          match: {
            description,
          },
        },
      },
    });
    const hits = result.hits.hits;
    return hits.map((item) => item._source);
  }

  async matchEnglishSearch(genre: string) {
    const result = await this.elasticsearchService.search<BookSearchBody>({
      index: this.index,
      body: {
        query: {
          match: {
            genre,
          },
        },
      },
    });
    const hits = result.hits.hits;
    return hits.map((item) => item._source);
  }

  async matchCustomSearch(annotation: string) {
    const result = await this.elasticsearchService.search<BookSearchBody>({
      index: this.index,
      body: {
        query: {
          match: {
            annotation,
          },
        },
      },
    });
    const hits = result.hits.hits;
    return hits.map((item) => item._source);
  }
}

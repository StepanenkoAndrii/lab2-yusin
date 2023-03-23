import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import BooksSearchService from './books-search.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    private booksSearchService: BooksSearchService,
  ) {}

  async createBook(book: CreateBookDto) {
    const newBook = await this.booksRepository.create(book);
    await this.booksRepository.save(newBook);
    this.booksSearchService.indexBook(newBook);

    return newBook;
  }

  async searchForBooks(text: string) {
    const results = await this.booksSearchService.search(text);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.booksRepository.find({
      where: { id: In(ids) },
    });
  }

  async searchBooksByPrice(price: number) {
    const results = await this.booksSearchService.termSearch(price);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.booksRepository.find({
      where: { id: In(ids) },
    });
  }

  async searchBooksByReleaseDate(gte: string, lte: string) {
    const results = await this.booksSearchService.rangeSearch(gte, lte);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.booksRepository.find({
      where: { id: In(ids) },
    });
  }

  async searchBooksByTitle(data: string) {
    const results = await this.booksSearchService.regexpSearch(data);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.booksRepository.find({
      where: { id: In(ids) },
    });
  }

  async getAllBooks() {
    const getAllBooks = await this.booksRepository.find();
    return getAllBooks ?? undefined;
  }

  async remove(id: number) {
    const deleteResponse = await this.booksRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new Error('Book not found');
    }
    await this.booksSearchService.remove(id);
  }

  ////////////////////////////////////////////////////////////////

  async searchBooksByDescription(data: string) {
    const results = await this.booksSearchService.matchStandardSearch(data);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.booksRepository.find({
      where: { id: In(ids) },
    });
  }

  async searchBooksByGenre(data: string) {
    const results = await this.booksSearchService.matchEnglishSearch(data);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.booksRepository.find({
      where: { id: In(ids) },
    });
  }

  async searchBooksByAnnotation(data: string) {
    const results = await this.booksSearchService.matchCustomSearch(data);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.booksRepository.find({
      where: { id: In(ids) },
    });
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  async getBooks(@Query('search') search: string) {
    if (search) {
      return this.booksService.searchForBooks(search);
    }
    return this.booksService.getAllBooks();
  }

  @Get('price')
  async getBooksByPrice(@Query('search') search: number) {
    if (search) {
      return this.booksService.searchBooksByPrice(search);
    }
    return this.booksService.getAllBooks();
  }

  @Get('release-date')
  async getBooksByReleaseDate(
    @Query('gte') gte: string,
    @Query('lte') lte: string,
  ) {
    if (gte && lte) {
      return this.booksService.searchBooksByReleaseDate(gte, lte);
    }
    return this.booksService.getAllBooks();
  }

  @Get('title')
  async getBooksByTitleOrAuthor(@Query('search') search: string) {
    if (search) {
      return this.booksService.searchBooksByTitle(search);
    }
    return this.booksService.getAllBooks();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }

  ////////////////////////////////

  @Get('description')
  async getBooksDescription(@Query('search') search: string) {
    if (search) {
      return this.booksService.searchBooksByDescription(search);
    }
    return this.booksService.getAllBooks();
  }

  @Get('genre')
  async getBooksGenre(@Query('search') search: string) {
    if (search) {
      return this.booksService.searchBooksByGenre(search);
    }
    return this.booksService.getAllBooks();
  }

  @Get('annotation')
  async getBooksAnnotation(@Query('search') search: string) {
    if (search) {
      return this.booksService.searchBooksByAnnotation(search);
    }
    return this.booksService.getAllBooks();
  }
}

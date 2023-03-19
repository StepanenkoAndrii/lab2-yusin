import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SearchModule } from 'src/search/search.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import BooksSearchService from './books-search.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), SearchModule],
  controllers: [BooksController],
  providers: [BooksService, BooksSearchService],
})
export class BooksModule {}

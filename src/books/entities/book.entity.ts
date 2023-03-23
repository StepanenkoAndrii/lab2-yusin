import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  releaseDate: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column()
  genre: string;

  @Column()
  annotation: string;
}

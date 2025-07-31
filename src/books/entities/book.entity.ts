import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publishedYear: number;
}
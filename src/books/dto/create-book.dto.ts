import { IsString, IsNumber, IsNotEmpty, Min, Max } from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @Min(1000) // Books published after year 1000
  @Max(new Date().getFullYear()) // No books from the future
  publishedYear: number;
}
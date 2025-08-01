import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe
} from '@nestjs/common';
import { BooksService } from './books.service'; // Import the BooksService
import { CreateBookDto } from "./dto/create-book.dto";
import type { Book } from './interfaces/book.interface';

@Controller('books') // Base route for all endpoints in this controller
@UsePipes(new ValidationPipe()) // Applies ValidationPipe to all handlers in this controller
export class BooksController {
  // Inject BooksService into the controller's constructor
  constructor(private readonly booksService: BooksService) {}

  @Post() // Handles POST requests to /books
  @HttpCode(HttpStatus.CREATED) // Set HTTP status to 201 Created for successful creation
  create(@Body() createBookDto: CreateBookDto): Book { 
    // Delegates the creation logic to the BooksService
    return this.booksService.create(createBookDto); 
  }

  @Get() // Handles GET requests to /books
  findAll(): Book[] {
    // Delegates fetching all books to the BooksService
    return this.booksService.findAll();
  }

  @Get(':id') // Handles GET requests to /books/:id (e.g., /books/a1b2c3d4)
  findOne(@Param('id', ParseUUIDPipe) id: string): Book {
    // Delegates finding a single book to the BooksService
    const book = this.booksService.findOne(id);
    if (!book) {
      // If book is not found, throw a NestJS built-in exception, which maps to 404 HTTP status
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
    return book;
  }

  @Put(':id') // Handles PUT requests to /books/:id
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatedBook: Partial<Book>): Book {
    // Delegates updating a book to the BooksService
    const book = this.booksService.update(id, updatedBook);
    if (!book) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
    return book;
  }

  @Delete(':id') // Handles DELETE requests to /books/:id
  @HttpCode(HttpStatus.NO_CONTENT) // Set HTTP status to 204 No Content for successful deletion
  remove(@Param('id', ParseUUIDPipe) id: string): void {
    // Delegates removal logic to the BooksService
    const removed = this.booksService.remove(id);
    if (!removed) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
  }
}


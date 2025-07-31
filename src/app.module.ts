import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [BooksModule], // Include the BooksModule in the imports array
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
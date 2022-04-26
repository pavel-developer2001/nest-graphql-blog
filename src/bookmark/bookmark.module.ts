import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkResolver } from './bookmark.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkEntity } from './entities/bookmark.entity';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookmarkEntity]),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ArticleModule
  ],
  providers: [BookmarkResolver, BookmarkService]
})
export class BookmarkModule {}

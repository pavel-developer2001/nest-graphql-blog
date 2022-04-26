import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleService } from 'src/article/article.service';
import { Repository } from 'typeorm';
import { CreateBookmarkInput } from './dto/create-bookmark.input';
import { BookmarkEntity } from './entities/bookmark.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(BookmarkEntity)
    private repository: Repository<BookmarkEntity>,
    private articleService: ArticleService,
  ) {}

  async create(createBookmarkInput: CreateBookmarkInput, userId: number) {
    try {
      const findBookmark = await this.repository.findOne({
        where: {
          article: { id: createBookmarkInput.articleId },
          user: { id: userId },
        },
      });
      if (findBookmark) {
        throw new HttpException(
          'Это статья уже добавлена в закладки',
          HttpStatus.FORBIDDEN,
        );
      }
      //TODO: пофиксить эту ошибку на проверку
      // const article = await this.articleService.findOne({
      //   where: { id: Number(createBookmarkInput.articleId) },
      // });
      // if (!article) {
      //   throw new HttpException(
      //     'Статьи, которую вы хотите добавить в закладки, не существует!',
      //     HttpStatus.FORBIDDEN,
      //   );
      // }
      return await this.repository.save({
        article: { id: createBookmarkInput.articleId },
        user: { id: userId },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async findAll(id: number) {
    try {
      return await this.repository.find({
        where: { user: { id } },
        order: {
          id: 'DESC',
        },
        relations: ['article'],
      });
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: number, userId: number) {
    try {
      const bookmark = await this.repository.findOne({
        where: {
          article: { id },
          user: { id: userId },
        },
        relations: ['article', 'user'],
      });
      if (bookmark.user.id !== userId) {
        throw new HttpException(
          'Вы не можете удалить эту закладку!',
          HttpStatus.FORBIDDEN,
        );
      }
      await this.repository.delete(bookmark.id);
      return bookmark;
    } catch (error) {
      console.log(error);
    }
  }

  async check(id: number, userId: number) {
    try {
      const bookmark = await this.repository.findOne({
        where: {
          article: { id },
          user: { id: userId },
        },
        relations: ['article', 'user'],
      });
      if (bookmark) {
        return true
      }
      return false
    } catch (error) {
      console.log(error);
    }
  }
}

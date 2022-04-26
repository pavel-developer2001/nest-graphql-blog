import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}

  create(createCommentDto: CreateCommentInput, userId: number) {
    return this.repository.save({
      ...createCommentDto,
      user: { id: userId },
      article: { id: createCommentDto.articleId },
    });
  }

  async findAll(id: number) {
    try {
      const comments = await this.repository.find({
        where: { article: { id } },
        order: {
          createdAt: 'DESC',
        },
      });
      return comments;
    } catch (error) {
      console.error(error);
    }
  }

  async update(
    userId: number,
    updateCommentInput: UpdateCommentInput,
    id: number,
  ) {
    try {
      const comment = await this.repository.findOne({ where: { id } });
      if (!comment) {
        throw new HttpException('Комментарий не найден!', HttpStatus.NOT_FOUND);
      }
      if (comment.user.id !== userId) {
        throw new HttpException(
          'Вы не можете редактировать этот комментарий!',
          HttpStatus.FORBIDDEN,
        );
      }
      await this.repository.update(id, {
        text: updateCommentInput.text,
        user: { id: userId },
      });
      return await this.repository.findOne(id);
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: number, userId: number) {
    try {
      const comment = await this.repository.findOne({ where: { id } });
      if (!comment) {
        throw new HttpException('Комментарий не найден!', HttpStatus.NOT_FOUND);
      }
      if (comment.user.id !== userId) {
        throw new HttpException(
          'Вы не можете удалить этот комментарий!',
          HttpStatus.FORBIDDEN,
        );
      }
      await this.repository.delete(id);
      return comment;
    } catch (error) {
      console.error(error);
    }
  }

  //TODO: для лайков сделать отдельную таблицу, где сохранять что для данного комментария был поставлен лайк или дизлайк!
  async plusLike(id: number | any, userId: number) {
    try {
      const findComment = await this.repository.findOne({ where: { id } });
      if (!findComment) {
        throw new HttpException(
          'Такого комментария не существует!',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.repository.update(findComment.id, {
        likesCount: findComment.likesCount + 1,
      });
      return (await findComment.likesCount) + 1;
    } catch (error) {
      console.error(error);
    }
  }

  async munisLike(id: number | any, userId: number) {
    try {
      const findComment = await this.repository.findOne({ where: { id } });
      if (!findComment) {
        throw new HttpException(
          'Такого комментария не существует!',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.repository.update(findComment.id, {
        likesCount: findComment.likesCount - 1,
      });
      return (await findComment.likesCount) - 1;
    } catch (error) {
      console.error(error);
    }
  }
}

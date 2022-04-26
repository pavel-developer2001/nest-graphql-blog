import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriberInput } from './dto/create-subscriber.input';
import { SubscriberEntity } from './entities/subscriber.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(SubscriberEntity)
    private repository: Repository<SubscriberEntity>,
  ) {}
  async create(createSubscriberInput: CreateSubscriberInput, userId: number) {
    try {
      const findSubscriber = await this.repository.findOne({
        where: { user: { id: createSubscriberInput.onWhomId } },
      });
      if (findSubscriber) {
        throw new HttpException(
          'Вы не можете подписаться на самого себя!',
          HttpStatus.FORBIDDEN,
        );
      }
      const subscriber = await this.repository.findOne({
        where: {
          user: userId,
          onWhomId: createSubscriberInput.onWhomId,
        },
      });
      if (subscriber) {
        throw new HttpException(
          'Вы уже подписанны на этого пользователя!',
          HttpStatus.FORBIDDEN,
        );
      }
      return this.repository.save({
        ...createSubscriberInput,
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
          createdAt: 'DESC',
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async remove(onWhomId: number, userId: number) {
    try {
      const subscriber = await this.repository.findOne({
        where: {
          user: userId,
          onWhomId: onWhomId,
        },
      });
      if (!subscriber) {
        throw new HttpException(
          'Вы не подписаны на этого пользователя!',
          HttpStatus.FORBIDDEN,
        );
      }
      await this.repository.delete(subscriber.id);
      return subscriber;
    } catch (error) {
      console.error(error);
    }
  }
  async check(onWhomId: number, userId: number) {
    try {
      const subscriber = await this.repository.findOne({
        where: {
          user: userId,
          onWhomId: onWhomId,
        },
      });
      if (subscriber) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  }
}

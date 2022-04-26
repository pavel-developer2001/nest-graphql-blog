import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { UserEntity } from 'src/user/entities/user.entity';
import { ArticleEntity } from 'src/article/entities/article.entity';

@ObjectType({ description: 'bookmark' })
@Entity('bookmarks')
export class BookmarkEntity {
  @Field((type) => ID, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, { eager: false })
  user: UserEntity;

  @Field((type) => ArticleEntity, { nullable: true })
  @ManyToOne(() => ArticleEntity, { eager: false })
  article: UserEntity;

  @Field((type) => String!, { nullable: false })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field((type) => String!, { nullable: false })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

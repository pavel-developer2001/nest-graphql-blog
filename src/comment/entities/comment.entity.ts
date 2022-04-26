import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ArticleEntity } from 'src/article/entities/article.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Int } from '@nestjs/graphql';

@ObjectType({ description: 'comment' })
@Entity('comments')
export class CommentEntity {
  @Field((type) => ID, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String!, { nullable: false })
  @Column()
  text: string;

  @Field((type) => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;

  @Field((type) => ArticleEntity, { nullable: true })
  @ManyToOne(() => ArticleEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  article: ArticleEntity;

  @Field((type) => String!, { nullable: false })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field((type) => Int!, { nullable: false })
  @Column({ default: 0 })
  likesCount: number;

  @Field((type) => String!, { nullable: false })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Field((type) => Int!, { nullable: true })
  @Column({ nullable: true })
  parentId?: number;
}

import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@ObjectType({ description: 'article' })
@Entity('articles')
export class ArticleEntity {
  @Field((type) => ID, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String!, { nullable: false })
  @Column()
  title: string;

  @Field((type) => String!, { nullable: false })
  @Column()
  text: string;

  @Field((type) => String!, { nullable: false })
  @Column({ nullable: true })
  img?: string;

  @Field((type) => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;

  @Field((type) => [CategoryEntity!]!, { nullable: false })
  @ManyToMany((type) => CategoryEntity, (category) => category.articles, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  categories: CategoryEntity[];

  @Field((type) => Int, { nullable: false })
  @Column({ default: 0 })
  watchCount: number;

  @Field((type) => String!, { nullable: false })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field((type) => String!, { nullable: false })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

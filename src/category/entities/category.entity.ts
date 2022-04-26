import { ArticleEntity } from 'src/article/entities/article.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'category' })
@Entity('categories')
export class CategoryEntity {
  @Field((type) => ID, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String!, { nullable: false })
  @Column()
  name: string;

  @Field((type) => [ArticleEntity!]!, { nullable: false })
  @ManyToMany((type) => ArticleEntity, (article) => article.categories)
  articles: ArticleEntity[];

  @Field((type) => String!, { nullable: false })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field((type) => String!, { nullable: false })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

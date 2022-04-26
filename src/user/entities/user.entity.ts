import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
@Entity({ name: 'users' })
export class UserEntity {
  @Field((type) => ID, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String, { nullable: false })
  @Column()
  name: string;

  @Field((type) => String, { nullable: false })
  @Column({
    unique: true,
  })
  email: string;

  @Field((type) => String, { nullable: false })
  @Column({ nullable: false })
  password: string;

  @Field((type) => String, { nullable: false })
  @Column({ nullable: true })
  avatar?: string;

  @Field((type) => String, { nullable: false })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field((type) => String, { nullable: false })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Field((type) => String, { nullable: false })
  access_token: string;
}

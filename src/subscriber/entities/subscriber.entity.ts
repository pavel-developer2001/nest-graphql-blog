import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@ObjectType({ description: 'subscriber' })
@Entity('subscribers')
export class SubscriberEntity {
  @Field((type) => ID, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Int!, { nullable: false })
  @Column()
  onWhomId: number;

  @Field((type) => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;

  @Field((type) => String!, { nullable: false })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field((type) => String!, { nullable: false })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

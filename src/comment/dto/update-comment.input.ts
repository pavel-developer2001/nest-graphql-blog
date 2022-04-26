import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class UpdateCommentInput {
  @Length(3)
  @Field((_type) => String, { nullable: false })
  text: string;
}

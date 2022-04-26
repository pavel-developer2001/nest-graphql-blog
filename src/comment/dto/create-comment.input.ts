import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional, Length } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Length(3)
  @Field((_type) => String, { nullable: false })
  text: string;

  @Field((_type) => Int, { nullable: false })
  articleId: number;

  @IsOptional()
  @Field((_type) => Int, { nullable: true })
  parentId?: number;
}

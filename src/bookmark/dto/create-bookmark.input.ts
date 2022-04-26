import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookmarkInput {
  @Field((_type) => Int, { nullable: false })
  articleId: number;
}

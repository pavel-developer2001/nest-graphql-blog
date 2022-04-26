import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional, Length } from 'class-validator';

@InputType()
export class CreateArticleInput {
  @Length(3, 100)
  @Field((_type) => String, { nullable: false })
  title: string;

  @Length(5, 5000)
  @Field((_type) => String, { nullable: false })
  text: string;

  @IsOptional()
  @Field((_type) => [String], { nullable: false })
  categories?: any;
}

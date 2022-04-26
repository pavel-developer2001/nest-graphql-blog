import { InputType, Field,} from '@nestjs/graphql';
import { IsOptional, Length } from 'class-validator';

@InputType()
export class UpdateArticleInput {
  @Length(3, 255)
  @Field((_type) => String, { nullable: false })
  title: string;

  @Length(5)
  @Field((_type) => String, { nullable: false })
  text: string;

  @IsOptional()
  @Field((_type) => String, { nullable: true })
  img?: string;
}

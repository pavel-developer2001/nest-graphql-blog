import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubscriberInput {
  @Field((_type) => Int, { nullable: false })
  onWhomId: number;
}

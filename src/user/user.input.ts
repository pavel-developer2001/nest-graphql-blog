import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @Length(3)
  @Field((_type) => String, { nullable: false })
  name: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  @Field((_type) => String, { nullable: false })
  email: string;

  @Length(6, 32, { message: 'Пароль должен минимум 6 символов' })
  @Field((_type) => String, { nullable: false })
  password: string;
}

@InputType()
export class LoginUserInput {
  @IsEmail(undefined, { message: 'Неверная почта' })
  @Field((_type) => String, { nullable: false })
  email: string;

  @Length(6, 32, { message: 'Пароль должен минимум 6 символов' })
  @Field((_type) => String, { nullable: false })
  password: string;
}

import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { LoginUserInput, RegisterUserInput } from 'src/user/user.input';
import { UserEntity as User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  @Mutation(() => User)
  registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ) {
    return this.authService.register(registerUserInput);
  }

  //TODO: Починить @UseGuards(LocalAuthGuard)
  // @UseGuards(LocalAuthGuard)
  //@ts-ignore
  @Mutation(() => User)
  async login(
    @Context() context,
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ) {
    const user = await this.usersService.findUser(loginUserInput);
    const isMatch = await bcrypt.compare(
      loginUserInput.password,
      user.password,
    );
    if (user && isMatch) {
      const { password, ...result } = user;
      const payload = { email: result.email, sub: result.id };
      return { ...result, access_token: this.jwtService.sign(payload) };
    }
    return null;
    // return await this.authService.login(context.req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  getProfile(@CurrentUser() userId: number, @Context() context) {
    console.log('userID', userId);
    return context.req.user;
  }
  // @Mutation('createAuth')
  // create(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
  //   return this.authService.create(createAuthInput);
  // }

  // @Query('auth')
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Query('auth')
  // findOne(@Args('id') id: number) {
  //   return this.authService.findOne(id);
  // }

  // @Mutation('updateAuth')
  // update(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
  //   return this.authService.update(updateAuthInput.id, updateAuthInput);
  // }

  // @Mutation('removeAuth')
  // remove(@Args('id') id: number) {
  //   return this.authService.remove(id);
  // }
}

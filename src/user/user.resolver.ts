import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserEntity as User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  findAllUsers() {
    return this.userService.findAll();
  }

  @Query(() => User)
  findUser(@Args('id') id: number) {
    return this.userService.findById(id);
  }

  // @Mutation('updateUser')
  // update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation('removeUser')
  // remove(@Args('id') id: number) {
  //   return this.userService.remove(id);
  // }
}

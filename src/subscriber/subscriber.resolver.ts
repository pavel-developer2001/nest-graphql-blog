import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubscriberService } from './subscriber.service';
import { SubscriberEntity as Subscriber } from './entities/subscriber.entity';
import { CreateSubscriberInput } from './dto/create-subscriber.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Subscriber)
export class SubscriberResolver {
  constructor(private readonly subscriberService: SubscriberService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Subscriber)
  createSubscriber(
    @Args('createSubscriberInput') createSubscriberInput: CreateSubscriberInput,
    @CurrentUser() userId: number,
  ) {
    return this.subscriberService.create(createSubscriberInput, userId);
  }

  @Query(() => [Subscriber])
  findAllSubscribersForUser(@Args('id', { type: () => Int }) id: number) {
    return this.subscriberService.findAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Subscriber)
  removeSubscriber(
    @Args('onWhomId', { type: () => Int }) onWhomId: number,
    @CurrentUser() userId: number,
  ) {
    return this.subscriberService.remove(onWhomId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  subscriptionCheck(
    @Args('onWhomId', { type: () => Int }) onWhomId: number,
    @CurrentUser() userId: number,
  ) {
    return this.subscriberService.check(onWhomId, userId);
  }
}

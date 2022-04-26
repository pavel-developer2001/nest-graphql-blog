import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentEntity as Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() userId: number,
  ) {
    return this.commentService.create(createCommentInput, userId);
  }

  @Query(() => [Comment])
  findAllComments(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.findAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() userId: number,
  ) {
    return this.commentService.update(userId, updateCommentInput, id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Comment)
  removeComment(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() userId: number,
  ) {
    return this.commentService.remove(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Int)
  plusLikeForComment(
    @Args('commentId', { type: () => Int }) id: number,
    @CurrentUser() userId: number,
  ) {
    return this.commentService.plusLike(id,userId)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Int)
  munisLikeForComment(@Args('commentId', { type: () => Int }) id: number,
  @CurrentUser() userId: number,) {
    return this.commentService.munisLike(id,userId)
  }
}

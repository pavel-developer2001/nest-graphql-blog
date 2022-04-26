import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookmarkService } from './bookmark.service';
import { BookmarkEntity as Bookmark } from './entities/bookmark.entity';
import { CreateBookmarkInput } from './dto/create-bookmark.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Resolver(() => Bookmark)
export class BookmarkResolver {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Bookmark)
  createBookmark(
    @Args('createBookmarkInput') createBookmarkInput: CreateBookmarkInput,
    @CurrentUser() userId: number,
  ) {
    return this.bookmarkService.create(createBookmarkInput, userId);
  }

  @Query(() => [Bookmark])
  findAllBookmarksForUser(@Args('userId', { type: () => Int }) id: number) {
    return this.bookmarkService.findAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Bookmark)
  removeBookmark(
    @Args('articleId', { type: () => Int }) id: number,
    @CurrentUser() userId: number,
  ) {
    return this.bookmarkService.remove(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  checkBookmark(
    @Args('articleId', { type: () => Int }) id: number,
    @CurrentUser() userId: number,
  ) {
    return this.bookmarkService.check(id, userId);
  }
}

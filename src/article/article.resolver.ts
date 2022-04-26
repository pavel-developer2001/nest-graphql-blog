import {
  forwardRef,
  Inject,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ArticleEntity as Article } from './entities/article.entity';
import { ArticleService } from './article.service';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';

@Resolver('Article')
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService,
    @Inject(forwardRef(() => CloudinaryService))
    private cloudinary: CloudinaryService,
  ) {}

  //TODO: Починить загрузку файлов
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Article)
  // @UseInterceptors(FileInterceptor('img'))
  async createArticle(
    @UploadedFile() file: Express.Multer.File,
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
    @CurrentUser() userId: number,
  ) {
    try {
      const newArticle = await this.articleService.create(
        createArticleInput,
        userId,
      );
      if (file) {
        await this.cloudinary.uploadImgArticle(file, newArticle.id);
      }
      return this.articleService.findOne(newArticle.id);
    } catch (error) {
      console.error(error);
    }
  }

  @Query(() => [Article])
  findAllArticles() {
    return this.articleService.findAll();
  }

  @Query(() => Article)
  findArticle(@Args('id', { type: () => Int }) id: number) {
    return this.articleService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Article)
  updateArticle(
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() userId: number,
  ) {
    return this.articleService.update(id, updateArticleInput, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Article)
  removeArticle(
    @CurrentUser() userId: number,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.articleService.remove(id, userId);
  }
}

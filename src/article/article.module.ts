import { forwardRef, Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { ArticleEntity } from './entities/article.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CategoryModule } from 'src/category/category.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forFeature([ArticleEntity]),
    forwardRef(() => CloudinaryModule),
    CategoryModule,
    UserModule,
  ],
  providers: [ArticleResolver, ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CommentModule } from './comment/comment.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    CategoryModule,
    CloudinaryModule,
    CommentModule,
    SubscriberModule,
    BookmarkModule
  ],
})
export class AppModule {}

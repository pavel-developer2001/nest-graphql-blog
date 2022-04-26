import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { CategoryEntity } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forFeature([CategoryEntity]),
  ],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}

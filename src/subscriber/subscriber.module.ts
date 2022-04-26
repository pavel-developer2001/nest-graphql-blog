import { Module } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { SubscriberResolver } from './subscriber.resolver';
import { SubscriberEntity } from './entities/subscriber.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriberEntity]),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  ],
  providers: [SubscriberResolver, SubscriberService]
})
export class SubscriberModule {}

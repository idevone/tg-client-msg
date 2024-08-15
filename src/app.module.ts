import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './configs/config.module';
import { PostgresConfig } from './configs/postgres.config';
import { TelegramModule } from './telegram/telegram.module';
import * as cors from 'cors';
import { ConfigService } from './configs/config.service';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    TelegramModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: PostgresConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly ORIGIN_URL: string;
  constructor(configService: ConfigService) {
    this.ORIGIN_URL = configService.getString('ORIGIN_URL');
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cors({
          origin: this.ORIGIN_URL, // Замініть на ваш домен
          credentials: true, // Дозволяє передачу облікових даних
        }),
      )
      .forRoutes('*');
  }
}

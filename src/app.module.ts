import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './configs/config.module';
import { PostgresConfig } from './configs/postgres.config';
import { TelegramModule } from './telegram/telegram.module';

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
export class AppModule {}

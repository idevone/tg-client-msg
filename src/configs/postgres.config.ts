import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { Injectable } from '@nestjs/common';
import { User } from '../telegram/models/user.model';
import { TelegramAccount } from '../telegram/models/telegram-account.model';

@Injectable()
export class PostgresConfig implements TypeOrmOptionsFactory {
  private readonly DATABASE_URL: string;

  constructor(configService: ConfigService) {
    this.DATABASE_URL = configService.getString('DATABASE_URL');
  }

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ssl: {
        rejectUnauthorized: false,
      },
      url: this.DATABASE_URL,
      synchronize: false,
      type: 'postgres',
      entities: [User, TelegramAccount],
    };
  }
}

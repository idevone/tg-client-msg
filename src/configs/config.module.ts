import { Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from './config.service';
import { PostgresConfig } from './postgres.config';
import { JwtConfig } from './jwt.config';

@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [ConfigService, PostgresConfig, JwtConfig],
  exports: [ConfigService, PostgresConfig, JwtConfig],
})
export class ConfigModule {}

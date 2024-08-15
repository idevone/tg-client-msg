import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { PrismaServiceModule } from './prisma-service/prisma-service.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TelegramModule, AuthModule, PrismaServiceModule, PrismaModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}

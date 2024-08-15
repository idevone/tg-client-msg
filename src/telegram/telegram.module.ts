import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { TelegramAccount } from './models/telegram-account.model';
import { TelegramService } from './telegram.service';
import { UserRepository } from './repositories/user.repository';
import { TelegramAccountRepository } from './repositories/telegram-account.repository';
import { TelegramController } from './telegram.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, TelegramAccount])],
  controllers: [TelegramController],
  providers: [TelegramService, UserRepository, TelegramAccountRepository],
  exports: [UserRepository, TelegramAccountRepository],
})
export class TelegramModule {}

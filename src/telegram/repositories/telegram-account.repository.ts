import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TelegramAccount } from '../models/telegram-account.model';

@Injectable()
export class TelegramAccountRepository extends Repository<TelegramAccount> {
  constructor(
    @InjectRepository(TelegramAccount) repository: Repository<TelegramAccount>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { TelegramAccountRepository } from './repositories/telegram-account.repository';
import { TelegramClient, Api } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { returnBigInt } from 'telegram/Helpers';

@Injectable()
export class TelegramService {
  constructor(
    private readonly user: UserRepository,
    private readonly account: TelegramAccountRepository,
  ) {}

  public async getAccounts() {
    return await this.account.find();
  }

  public async getChats(accountId: string) {
    try {
      const client = await this.getClient(accountId);
      if (!client) {
        throw new NotFoundException('Client not found');
      }

      const dialogs = await client.getDialogs();
      const dialogsData = dialogs.map((dialog) => ({
        id: dialog.id,
        title: dialog.title,
      }));

      await client.disconnect();
      return dialogsData;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  public async getMessages(accountId: string, chatId: string) {
    try {
      const client = await this.getClient(accountId);
      if (!client) {
        throw new NotFoundException('Client not found');
      }
      const bigIntId = returnBigInt(chatId);

      const dialogs = await client.getDialogs({});
      const channel = dialogs.find((d) => bigIntId.equals(d.id));
      const messages = await client.getMessages(channel.entity, {
        limit: 100,
        reverse: true,
      });

      const serializedMessages = messages.map((msg) => ({
        id: msg.id,
        text: msg.message,
        date: msg.date,
        senderId: msg.fromId ?? msg.peerId,
      }));

      await client.disconnect();

      return serializedMessages;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  public async sendMessage(accountId: string, chatId: string, text: string) {
    try {
      const client = await this.getClient(accountId);
      if (!client) {
        throw new NotFoundException('Client not found');
      }

      await client.sendMessage(chatId, {
        message: text,
      });

      await client.disconnect();

      return { message: 'Message sent' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  private async getClient(telegramId: string) {
    const account = await this.account.findOne({
      where: { telegram_id: telegramId },
    });
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (!account.api_id) {
      throw new BadRequestException('API ID is not set');
    }
    if (!account.api_hash) {
      throw new BadRequestException('API Hash is not set');
    }
    if (!account.session_string) {
      throw new BadRequestException('Session string is not set');
    }

    const stringSession = new StringSession(account.session_string || '');

    const client = new TelegramClient(
      stringSession,
      Number(account.api_id),
      account.api_hash,
      {
        connectionRetries: 5,
      },
    );

    await client.connect();

    if (client.session.authKey) {
      return client;
    }
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Get('accounts')
  public async getAccounts() {
    return await this.telegramService.getAccounts();
  }

  @Get('chats/:accountId')
  public async getChats(@Param('accountId') accountId: string) {
    return await this.telegramService.getChats(accountId);
  }

  @Get('messages/:accountId/:chatId')
  public async getMessages(
    @Param('accountId') accountId: string,
    @Param('chatId') chatId: string,
  ) {
    return await this.telegramService.getMessages(accountId, chatId);
  }

  @Post('send-message/:accountId/:chatId')
  public async sendMessage(
    @Param('accountId') accountId: string,
    @Param('chatId') chatId: string,
    @Body('text') text: string,
  ) {
    return await this.telegramService.sendMessage(accountId, chatId, text);
  }
}

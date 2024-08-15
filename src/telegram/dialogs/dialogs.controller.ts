import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/accounts')
export class DialogsController {
  @Get()
  getAccounts() {
    return 'This action returns all accounts';
  }

  @Get('getChats')
  getChats() {
    return 'This action returns';
  }
}

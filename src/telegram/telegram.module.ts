import { Module } from '@nestjs/common';
import { DialogsController } from './dialogs/dialogs.controller';
import { DialogsService } from './dialogs/dialogs.service';
import { DialogsModule } from './dialogs/dialogs.module';

@Module({
  controllers: [DialogsController],
  providers: [DialogsService],
  imports: [DialogsModule],
})
export class TelegramModule {}

import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from './config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(configService: ConfigService) {
    this.secret = configService.getString('JWT_SECRET');
    this.expiresIn = '60m';
  }

  createJwtOptions(): JwtModuleOptions {
    return {
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: this.expiresIn },
    };
  }
}

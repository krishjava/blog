import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { AuthService } from './auth.service';
import { ReferCodeEntity } from 'src/db/entities/refercode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ReferCodeEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

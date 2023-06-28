import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'containers-us-west-75.railway.app',
      port: 7577,
      username: 'root',
      password: 'w89MC0Fu5usNSxxhOZ8R',
      database: 'railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

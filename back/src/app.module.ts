import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({ isGlobal: true }), MoviesModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReservationDto {
  @ApiProperty({ example: '2025-04-09T18:00:00.000Z' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  movieId: string;
}

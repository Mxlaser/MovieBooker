import {
    Controller,
    Post,
    Get,
    Delete,
    Body,
    Param,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { ReservationService } from './reservation.service';
  import { ReservationDto } from './dto/reservation.dto';
  import { JwtAuthGuard } from '../users/jwt-auth.guard';
  import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
    ApiParam,
  } from '@nestjs/swagger';
  
  @ApiTags('reservations')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Controller('reservations')
  export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}
  
    @Post()
    @ApiOperation({ summary: 'Créer une réservation' })
    create(@Body() dto: ReservationDto, @Req() req) {
        return this.reservationService.create(dto, req.user);
    }
  
    @Get()
    @ApiOperation({ summary: 'Lister les réservations de l’utilisateur' })
    findAll(@Req() req) {
      return this.reservationService.findAllForUser(req.user);
    }
  
    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID de la réservation à supprimer'})
    @ApiOperation({ summary: 'Annuler une réservation' })
    remove(@Param('id') id: number, @Req() req) {
      return this.reservationService.remove(id, req.user);
    }
  }
  
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';

interface Reservation {
  id: number;
  userEmail: string;
  movieId: string;
  startTime: Date;
  endTime: Date;
}

@Injectable()
export class ReservationService {
  private reservations: Reservation[] = [];
  private counter = 1;

  async create(dto: ReservationDto, user: any) {
    const start = new Date(dto.startTime);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

    const conflict = this.reservations.find((r) => {
      return (
        r.userEmail === user.email &&
        ((start >= r.startTime && start < r.endTime) ||
         (end > r.startTime && end <= r.endTime))
      );
    });

    if (conflict) {
      throw new BadRequestException(
        'Conflit de réservation. Respectez un délai de 2h entre les films.'
      );
    }

    const reservation: Reservation = {
      id: this.counter,
      userEmail: user.email,
      movieId: dto.movieId,
      startTime: start,
      endTime: end,
    };

    this.reservations.push(reservation);
    this.counter++;

    return reservation;
  }

  findAllForUser(user: any) {
    return this.reservations.filter((r) => r.userEmail === user.email);
  }

  remove(id: number, user: any) {
    const index = this.reservations.findIndex(
      (r) => r.id === id && r.userEmail === user.email,
    );

    if (index === -1) {
      throw new NotFoundException('Réservation introuvable.');
    }

    this.reservations.splice(index, 1);
    return { message: 'Réservation annulée.' };
  }
}

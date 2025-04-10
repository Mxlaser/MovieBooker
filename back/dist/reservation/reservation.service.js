"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
let ReservationService = class ReservationService {
    reservations = [];
    counter = 1;
    async create(dto, user) {
        const start = new Date(dto.startTime);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
        const conflict = this.reservations.find((r) => {
            return (r.userEmail === user.email &&
                ((start >= r.startTime && start < r.endTime) ||
                    (end > r.startTime && end <= r.endTime)));
        });
        if (conflict) {
            throw new common_1.BadRequestException('Conflit de réservation. Respectez un délai de 2h entre les films.');
        }
        const reservation = {
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
    findAllForUser(user) {
        return this.reservations.filter((r) => r.userEmail === user.email);
    }
    remove(id, user) {
        const index = this.reservations.findIndex((r) => r.id === id && r.userEmail === user.email);
        if (index === -1) {
            throw new common_1.NotFoundException('Réservation introuvable.');
        }
        this.reservations.splice(index, 1);
        return { message: 'Réservation annulée.' };
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)()
], ReservationService);
//# sourceMappingURL=reservation.service.js.map
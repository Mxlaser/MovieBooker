import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor(
        private readonly http: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.apiKey = this.configService.get<string>('TMDB_API_KEY')!;
        this.baseUrl = this.configService.get<string>('TMDB_BASE_URL')!;
    }

    async getNowPlaying(page = 1) {
        const url = `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&page=${page}`;
        const response = await firstValueFrom(this.http.get(url));
        return response.data;
    }

    async searchMovie(query: string, page = 1, sort?: string) {
        let url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
        const response = await firstValueFrom(this.http.get(url));
        return response.data;
    }

    async getMovieById(id: string) {
        const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`;
        const response = await firstValueFrom(this.http.get(url));
        return response.data;
    }

    async getGenres() {
        const url = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`;
        const response = await firstValueFrom(this.http.get(url));
        return response.data;
    }
}

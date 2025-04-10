import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../users/jwt-auth.guard';
  
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    @ApiOperation({ summary: 'Liste des films en salle ou par recherche' })
    @ApiQuery({ name: 'search', required: false, example: 'batman' })
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'sort', required: false, example: 'popularity.desc' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getMovies(
        @Query('search') search?: string,
        @Query('page') page = 1,
        @Query('sort') sort?: string,
    ) {
        if (search) {
            return this.moviesService.searchMovie(search, +page, sort);
        }
            return this.moviesService.getNowPlaying(+page);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Détails d’un film par ID' })
    @ApiParam({ name: 'id', example: '550' })
    async getMovieById(@Param('id') id: string) {
        return this.moviesService.getMovieById(id);
    }
  
    @Get('/genres/list')
    @ApiOperation({ summary: 'Liste des genres de films' })
    async getGenres() {
        return this.moviesService.getGenres();
    }
  }
  
  import {
    Controller,
    Post,
    Body,
    Request,
    UseGuards,
    Get,
    Param,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LoginDto } from './dto/login.dto';
  import { JwtAuthGuard } from './jwt-auth.guard';
  import { Roles } from './guard/roles.decorator';
  import { RolesGuard } from './guard/roles.guard';

  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() data: any) {
      return this.authService.register(data);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.motDePasse,
      );
      return this.authService.login(user);
    }

    // Exemple NestJS
    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@Request() req) {
      return req.user; // req.user est rempli par le guard JWT
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get('users')
    async findAll() {
      return this.authService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('users/:id')
    async findOne(@Param('id') id: string, @Request() req) {
      if (req.user.role !== 'ADMIN' && req.user.sub !== +id) {
        return { message: 'Accès refusé' };
      }
      return this.authService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }

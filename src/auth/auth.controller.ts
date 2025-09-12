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
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() data: any) {
    return this.authService.register(data);
  }

  // ✅ Accessible uniquement aux admins
  @Roles('ADMIN')
  @Get('users')
  async findAll() {
    return this.authService.findAll();
  }

  // ✅ Accessible à l’admin OU à l’utilisateur lui-même
  @Get('users/:id')
  async findOne(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'ADMIN' && req.user.sub !== +id) {
      return { message: 'Accès refusé' };
    }
    return this.authService.findOne(+id);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.motDePasse,
    );
    return this.authService.login(user);
  }

  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

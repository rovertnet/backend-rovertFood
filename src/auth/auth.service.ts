import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, motDePasse: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Utilisateur non trouvé');

    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMatch) throw new UnauthorizedException('Mot de passe incorrect');

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        nom: true,
        email: true,
        role: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nom: true,
        email: true,
        role: true,
      },
    });
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.motDePasse, 10);
    return this.prisma.user.create({
      data: {
        nom: data.nom,
        email: data.email,
        motDePasse: hashedPassword,
        role: data.role || 'CLIENT',
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.restaurant.findMany();
  }

  async create(data: Prisma.RestaurantCreateInput) {
    return this.prisma.restaurant.create({ data });
  }
}

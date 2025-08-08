import { Controller, Get, Post, Body } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  getAll() {
    return this.restaurantService.findAll();
  }

  @Post()
  create(@Body() body: { name: string; address: string; phone: string }) {
    return this.restaurantService.create(body);
  }
}

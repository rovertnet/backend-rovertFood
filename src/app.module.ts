import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { PrismaModule } from 'prisma/prisma.module';
import { MenuModule } from './menu/menu.module';
import { CommandeModule } from './commande/commande.module';
import { CategorieModule } from './categorie/categorie.module';
import { ContactModule } from './contact/contact.module';
import { PanierModule } from './panier/panier.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { EquipeModule } from './equipe/equipe.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    RestaurantModule,
    PrismaModule,
    MenuModule,
    CommandeModule,
    CategorieModule,
    ContactModule,
    PanierModule,
    WishlistModule,
    NewsletterModule,
    EquipeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

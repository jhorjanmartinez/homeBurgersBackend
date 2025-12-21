import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // Carga las variables de entorno desde .env
    ConfigModule.forRoot(),

    // Configuración de la base de datos usando variables de entorno
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, //solo para desarrollo
    }),

    CategoriesModule,

    CommonModule,
  ],
  controllers: [],
  providers: [
    
  ],
})
export class AppModule {}

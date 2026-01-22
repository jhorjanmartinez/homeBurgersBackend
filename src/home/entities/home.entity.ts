import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HomeCarrouselItem } from './home-carrousel-item.entity';

@Entity()
export class Home {
  @PrimaryGeneratedColumn('uuid')
  home_id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  homeVideoUrl: string;

  @Column({
    type: 'text',
  })
  homePrincipal: string;

  @Column({
    type: 'text',
    nullable:true
  })
  sala: string;

  @Column({
    type: 'text',
    nullable:true
  })
  sala2: string;

  @Column({
    type: 'text',
    nullable:true
  })
  hamburguesa4: string;

  @Column({
    type: 'text',
    nullable:true
  })
  hamburguesa: string;

  @OneToMany(
    () => HomeCarrouselItem,
    (homeCarrouselItem) => homeCarrouselItem.homes,
    { cascade: true },
  )
  homeCarrousels: HomeCarrouselItem[];
}

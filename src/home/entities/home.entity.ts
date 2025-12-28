import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('homes')
export class Home {

  @PrimaryGeneratedColumn('uuid')
  home_id: string;

  @Column({ 
    type: 'text', 
})
  homeVideoUrl: string;


  @Column({
    type: 'text'
  })
  homePrincipal:string;


  @Column({
    type: 'text'
  })
  home1:string;


  @Column({
    type: 'text'
  })
  home2:string;


  @Column({
    type: 'text'
  })
  home3:string;


  @Column({
    type: 'text'
  })
  home4:string;


  @Column({
    type: 'text'
  })
  sala:string;


  @Column({
    type: 'text'
  })
  sala2:string;


  @Column({
    type: 'text'
  })
  hamburguesa:string;


  @Column({
    type: 'text'
  })
  hamburguesa4:string;

}

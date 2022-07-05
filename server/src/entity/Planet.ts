import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Planet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  keplerName: string;
}

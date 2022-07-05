import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Planet } from "./Planet";

@Entity()
export class Launch {
  @PrimaryGeneratedColumn()
  flightNumber: number;

  @Column()
  launchDate: Date;

  @Column()
  mission: string;

  @Column()
  rocket: string;

  @Column()
  upcoming: boolean;

  @Column()
  success: boolean;

  @ManyToOne(() => Planet)
  destination: Planet;
}

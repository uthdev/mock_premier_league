import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";
import { TeamEntity } from "./Team";

@Entity('fixtures')
export class FixtureEntity {

  @ObjectIdColumn()
  _id: string;

  @Column()
  link: string;

  @Column()
  matchDate: Date;

  @Column(type => TeamEntity)
  homeTeam: TeamEntity;

  @Column(type => TeamEntity)
  awayTeam: TeamEntity;

  @Column({nullable: true, type: "number" })
  homeTeamScore: number;

  @Column({nullable: true, type: "number" })
  awayTeamScore: number;

  @Column()
  createdBy: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
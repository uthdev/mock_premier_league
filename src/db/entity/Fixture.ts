import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity('fixtures')
export class FixtureEntity {

  @ObjectIdColumn()
  _id: string;

  @Column()
  link: string;

  @Column()
  matchDate: Date;

  @Column()
  homeTeam: string;

  @Column()
  awayTeam: string;

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
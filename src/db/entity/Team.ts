import { Column, CreateDateColumn, Entity, Index, ObjectID, ObjectIdColumn, PrimaryColumn, Unique } from "typeorm";

@Entity('teams')
@Unique(["teamName"])
export class TeamEntity {

  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  @Column({ unique: true })
  @Index({ unique: true })
  teamName: string;

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;
}
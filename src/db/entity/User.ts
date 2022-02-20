import { Column, CreateDateColumn, Entity,  ObjectIdColumn } from "typeorm";

@Entity('users')
export class UserEntity {

  @ObjectIdColumn()
  _id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({default: false, insert: true })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
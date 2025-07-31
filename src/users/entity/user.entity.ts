import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Roles {
  ADMIN = 'admin',
  MANAGER = 'manager',
  DEVELOPER = 'developer',
}

@Entity()
export class usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.DEVELOPER })
  role: Roles

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

import { usuario } from '../../users/entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  Column,
  JoinTable,
} from 'typeorm';

export enum ProyectoPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum ProyectoStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Entity()
export class proyecto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: ProyectoStatus, default: ProyectoStatus.PLANNING })
  status: ProyectoStatus;

  @Column({ type: 'enum', enum: ProyectoPriority, default: ProyectoPriority.LOW })
  priority: ProyectoPriority;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => usuario, { eager: true })
  managerId: usuario;

  @ManyToMany(() => usuario, { eager: true })
  @JoinTable()
  developersIds: usuario[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

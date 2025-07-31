import { proyecto } from 'src/projects/entity/proyecto.entity';
import { usuario } from '../../users/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

export enum ProyectoPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum ProyectoStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  DONE = 'done',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: ProyectoStatus, default: ProyectoStatus.TODO })
  status: ProyectoStatus;

  @Column({ type: 'enum', enum: ProyectoPriority, default: ProyectoPriority.LOW })
  priority: ProyectoPriority;

  @ManyToOne(() => proyecto, { eager: true })
  projectId: proyecto;

  @ManyToOne(() => usuario, { eager: true })
  assignedTo: usuario;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  estimatedHours: number;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  actualHours: number;

  @Column()
  dueDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

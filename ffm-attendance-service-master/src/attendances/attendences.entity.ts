import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { DashboardUserEntity } from './dashboard-user.entity';

@Entity({ name: 'field_attendence' })
export class AttendenceEntity {

  @PrimaryGeneratedColumn() id:number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'timestamptz' })
  assigned_time: string;

  @Column({ type: 'varchar' })
  assigned_location_lattitude: string;


  @Column({ type: 'varchar' })
  assigned_location_longitude: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type : 'integer'})
  admin_id:number

  @Column({ type: 'timestamptz',default:null})
  attendence_time: string;

  @Column({ type: 'varchar',default:null})
  attendence_location_lattitude: string;

  @Column({ type: 'varchar',default:null})
  attendence_location_longitude: string;

  @Column({ type: 'boolean',default:null})
  attendence_status:boolean

  @Column({ type : 'varchar',default:null})
  comment:string

  @Column({ type : 'integer',default:null})
  user_id:number

  @Column({ type : 'integer',default:null})
  album_id:number

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  
}
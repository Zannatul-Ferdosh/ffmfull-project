import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'field_deliveries' })
export class DeliveryEntity {

  @PrimaryGeneratedColumn() id:number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'timestamptz' })
  assigned_delivery_time: Date;

  @Column({ type: 'varchar' })
  assigned_location_lattitude: string;


  @Column({ type: 'varchar' })
  assigned_location_longitude: string;

  @Column({ type: 'varchar' })
  client_name: string;

  @Column({ type: 'varchar' })
  client_address: string;

  @Column({ type : 'integer'})
  admin_id:number

  @Column({ type: 'timestamptz',default:null})
  delivery_time: string;

  @Column({ type: 'varchar',default:null})
  delivery_location_lattitude: string;

  @Column({ type: 'varchar',default:null})
  delivery_location_longitude: string;

  @Column({ type: 'boolean',default:null})
  delivery_status:boolean

  @Column({ type: 'boolean',default:null})
  payment_status:boolean

  @Column({ type: 'float',default:null})
  bill_amount:number

  @Column({ type: 'boolean',default:false})
  is_paid:boolean

  @Column({ type : 'varchar',default:null})
  note:string

  @Column({ type : 'integer',default:null})
  user_id:number

  @Column({ type : 'integer',default:null})
  album_id:number

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

}
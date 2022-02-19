import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'delivery_photos' })
export class DeliveryPhotosEntity {

  @PrimaryGeneratedColumn() id:number;

  @Column({ type: 'integer' })
  delivery_album_id: number;

  @Column({ type: 'varchar' })
  photo_url: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;




}
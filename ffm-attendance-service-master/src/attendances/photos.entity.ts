import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'photos' })
export class PhotosEntity {

  @PrimaryGeneratedColumn() id:number;

  @Column({ type: 'integer' })
  album_id: number;

  @Column({ type: 'varchar' })
  photo_url: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
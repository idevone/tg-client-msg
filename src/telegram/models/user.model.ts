import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  public username: string;

  @Column()
  public password_hash: string;

  @Column({ nullable: true, unique: true })
  public authKey: string;

  @Column({ nullable: true, unique: true })
  public accessToken: string;

  @Column({ default: 'Admin' })
  public role: string;

  @Column({ nullable: true, unique: true })
  public telegram_accounts: string;

  @Column({ default: 'Active' })
  public status: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}

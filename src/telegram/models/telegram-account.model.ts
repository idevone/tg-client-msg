import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('telegram_account')
export class TelegramAccount {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public telegram_id: string;

  @Column({ nullable: true })
  public username: string;

  @Column({ nullable: true })
  public first_name: string;

  @Column({ nullable: true })
  public last_name: string;

  @Column({ unique: true })
  public phone: string;

  @Column({ nullable: true, unique: true })
  public session_string: string;

  @Column({ unique: true })
  public api_id: string;

  @Column({ unique: true })
  public api_hash: string;

  @Column()
  public users: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}

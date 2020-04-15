import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { TransactionType } from '../interfaces/transaction';
import Category from './Category';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('enum', { enum: TransactionType, default: 'income' })
  type: TransactionType;

  @Column('integer')
  value: number;

  @Column('uuid')
  category_id: string;

  @ManyToOne(type => Category, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'category_id' })
  category: Category;

  @CreateDateColumn({
    type: 'time with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'time with time zone', nullable: false })
  updated_at: Date;
}

export default Transaction;

import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getIncome(): Promise<number> {
    const transactions = await this.find({
      where: {
        type: 'income',
      },
    });

    return transactions.reduce((sum: number, transaction: Transaction) => {
      return sum + transaction.value;
    }, 0);
  }

  public async getOutcome(): Promise<number> {
    const transactions = await this.find({
      where: {
        type: 'outcome',
      },
    });

    return transactions.reduce((sum: number, transaction: Transaction) => {
      return sum + transaction.value;
    }, 0);
  }

  public async getBalance(): Promise<Balance> {
    const income = await this.getIncome();
    const outcome = await this.getOutcome();

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }
}

export default TransactionsRepository;

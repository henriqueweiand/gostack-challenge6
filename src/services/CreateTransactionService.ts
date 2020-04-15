import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CategoriesRepository from '../repositories/CategoriesRepository';
import { TransactionRequest } from '../interfaces/transaction';
import AppError from '../errors/AppError';

class CreateTransactionService {
  private readonly transactionsRepository: TransactionsRepository;

  constructor() {
    this.transactionsRepository = getCustomRepository(TransactionsRepository);
  }

  public async execute({
    title,
    value,
    type,
    category,
  }: TransactionRequest): Promise<Transaction> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const { total } = await this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('Caixa não possui este valor de saida', 400);
    }

    let checkCategory = await categoriesRepository.getByTitle(category);

    if (!checkCategory) {
      checkCategory = categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(checkCategory);
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
      category_id: checkCategory!.id,
    });

    await this.transactionsRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;

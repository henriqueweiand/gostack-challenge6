/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import fs from 'fs';
import getStream from 'get-stream';
import parse from 'csv-parse';

import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

class ImportTransactionsService {
  private createTransactionService: CreateTransactionService;

  constructor() {
    this.createTransactionService = new CreateTransactionService();
  }

  async readCSVData(filePath: any): Promise<any> {
    const parseStream = parse({ delimiter: ',' });
    const data = await getStream.array(
      fs.createReadStream(filePath).pipe(parseStream),
    );
    return data;
  }

  async execute(file: any): Promise<Transaction[]> {
    const content = await this.readCSVData(file.path);
    const response = [];

    for (let index = 0; index < content.length; index++) {
      if (index) {
        const element = content[index];
        const [title, type, value, category] = element;

        const transaction = await this.createTransactionService.execute({
          title: title.trim(),
          type: type.trim(),
          value: parseInt(value.trim(), 10),
          category: category.trim(),
        });

        response.push(transaction);
      }
    }

    return response;
  }
}

export default ImportTransactionsService;

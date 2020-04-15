import { EntityRepository, Repository } from 'typeorm';

import Category from '../models/Category';

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
  public async getByTitle(title: string): Promise<Category | undefined> {
    const category = await this.findOne({
      where: {
        title,
      },
    });

    return category;
  }
}

export default CategoriesRepository;

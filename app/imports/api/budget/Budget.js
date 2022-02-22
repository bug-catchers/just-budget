import SimpleSchema from 'simpl-schema';

class Budget {
  constructor() {
    this.schema = new SimpleSchema({
      name: String,
      amount: Number,
    });
  }
} export const Budgets = new Budget();

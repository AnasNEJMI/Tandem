import { Expense } from '@/types';
import React from 'react'

interface ExpensePresentationProps{
    expenses : Expense[],

}

const ExpensesPresentationElement = ({expenses} : ExpensePresentationProps) => {
    const calculateTotalAmount = (expenses : Expense[]) => {
        let totalAmount = 0.00;

        expenses.forEach((expense) => {
            totalAmount += Number(expense.amount);
        });

        return totalAmount;
    }
    const calculateTotalAmountForSpender = (expenses: Expense[], spenderId : number) => {
        const spenderExpenses = expenses.filter((expense) => expense.spender.id === spenderId); 
        if(spenderExpenses.length === 0) return 0;

        let totalAmount = 0.00;

        spenderExpenses.forEach((expense) => {
            totalAmount += Number(expense.amount);
        });

        return totalAmount;
    }
  return (
    <div className='w-full flex flex-col items-center mt-10'>
        <span className='font-black text-4xl'>{calculateTotalAmount(expenses).toString().split('.').join(',')} €</span>
        <span className='text-muted-foreground font-light text-xs'>Total Dépensé</span>
    </div>
  )
}

export default ExpensesPresentationElement
import { Expense } from '@/types';
import React from 'react'
import AnimatedCounter from './animated-counter';

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
        <div><AnimatedCounter to = {calculateTotalAmount(expenses)} duration={1.5} className='font-black text-4xl'/><span className='font-black text-4xl'> €</span></div>
        <span className='text-muted-foreground font-light text-xs'>Total Dépensé</span>
    </div>
  )
}

export default ExpensesPresentationElement
import { Expense } from '@/types'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface ExpensesRecapCardProp{
    expenses : Expense[];
}
const ExpensesRecapCard = ({expenses} : ExpensesRecapCardProp) => {
    const calculateTotalAmount = (expenses : Expense[]) => {
        let totalAmount = 0.00;

        expenses.forEach((expense) => {
            totalAmount += Number(expense.amount);
        });

        return totalAmount;
    }
  return (
    <Card className="rounded-xl mt-6  opacity-100 translate-y-0 duration-750 starting:opacity-0 starting:translate-y-6 transition-all">
        <CardHeader className="px-6 pt-2 pb-0 text-left flex">
            <CardTitle className="text-xl">Récap du mois</CardTitle>
        </CardHeader>
        <CardContent className=" flex flex-col gap-2">
            <div className='flex justify-between w-full'>
                <div className='flex flex-col items-center'>
                    <span className='text-2xl font-bold'>{calculateTotalAmount(expenses).toString().split('.').join(',')} €</span>
                    <span className='text-xs'>Total Dépensé</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-2xl font-bold'>5</span>
                    <span className='text-xs'>Nombre de dépenses</span>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default ExpensesRecapCard
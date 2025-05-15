import { Expense } from '@/types';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ExpensesRepartitionCardProp{
    expenses : Expense[];
}

const ExpensesRepartitionCard = ({expenses} : ExpensesRepartitionCardProp) => {
  return (
    <Card className="rounded-xl mt-6  opacity-100 translate-y-0 duration-750 starting:opacity-0 starting:translate-y-6 transition-all">
        <CardHeader className="px-6 pt-2 pb-0 text-left flex">
            <CardTitle className="text-xl">Répartition des dépenses</CardTitle>
        </CardHeader>
        <CardContent className=" flex flex-col gap-2">
            
        </CardContent>
    </Card>
  )
}

export default ExpensesRepartitionCard
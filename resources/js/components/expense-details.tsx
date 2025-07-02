import { Expense, Preferences } from '@/types'
import { HouseIcon, PlaneIcon, PlugIcon, PuzzleIcon, ShoppingCartIcon, SoupIcon, WindIcon } from 'lucide-react'
import { useEffect } from 'react';
import CategoryIcon from './category-icon';
import { currencySymbols, formatAmount, formatDate } from '@/lib/data';

interface ExpenseDetailsProps{
    expense : Expense,
    preferences : Preferences,
}

const ExpenseDetails = ({expense, preferences} : ExpenseDetailsProps) => {
    const currencySymbol = currencySymbols[preferences.currency];
    // function formatDate(input: string): string {
    //     const [year, month, day] = input.split("-");
    //     return `${day}/${month}/${year}`;
    // }
    
  return (
    <div className={`flex items-center gap-4 rounded-md before:bg-white relative before:absolute before:w-full before:h-full before:z-10 before:left-0 before:-top-1 before:border-t before:border-card-border before:rounded-md before:shadow-lg`}>
        <div className='flex gap-2'>
            <div style={{background : expense.category.color}} className='w-1 h-12 z-20 rounded-xs'>
            </div>
            <div className="rounded-full flex items-center justify-center relative z-20">
                <CategoryIcon category={expense.category.name}/>
            </div>
        </div>
        <div className={`flex flex-1 justify-between items-center py-2 rounded-md relative pr-4`}>
            <div className = "z-20 flex flex-col items-start justify-center gap-1">
                <span className = "font-bold">{expense.category.name}</span>
                <p>
                <span className='px-2 rounded-xs bg-accent-foreground text-accent text-xs mr-2'>{expense.spender.name}</span>
                {
                    expense.places.length > 0 && 
                    <>
                        <span className='text-xs text-muted-foreground'>|</span>
                        <span className='text-xs text-muted-foreground ml-2'>{expense.places[0].name}</span>
                    </>
                }
                </p>
            </div>
            <div className='flex flex-col z-20 gap-1'>
                <span className="font-bold">{formatAmount(Number(expense.amount), preferences.number_format)} {currencySymbol}</span>
                <span className='text-[0.7rem] text-muted-foreground'>{formatDate(expense.date, preferences.date_format)}</span>
            </div>
        </div>
    </div>
  )
}

export default ExpenseDetails
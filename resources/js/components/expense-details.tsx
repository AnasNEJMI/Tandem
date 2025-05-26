import { Expense } from '@/types'
import { HouseIcon, PlaneIcon, PlugIcon, PuzzleIcon, ShoppingCartIcon, SoupIcon, WindIcon } from 'lucide-react'
import { useEffect } from 'react';

const expenseCategories = ["Tout","Courses","Loyer","Électricité","Gaz","Voyage","Restaurant","Loisirs"];

const ExpenseDetails = ({expense} : {expense : Expense}) => {
    let json = JSON.stringify(expense, null)
    useEffect(() => {
      console.log('expense', expense)
      console.log('json', json)
    }, [])

    function formatDate(input: string): string {
        const [year, month, day] = input.split("-");
        return `${day}/${month}/${year}`;
    }
    
  return (
    <div className={`flex items-center gap-4 rounded-b-md rounded-tr-md bg-card-border border border-card-border before:bg-white relative before:absolute before:w-full before:h-full before:z-10 before:left-0 before:-top-1 before:border-t before:border-card-border before:rounded-b-md before:rounded-tr-md  px-4`}>
        <div className='absolute -top-[15px] left-0 rounded-t-md px-2 h-3 bg-black text-white flex items-center justify-center z-30 text-[0.7rem]'>
            {expense.spender.name}
        </div>
        <div className="rounded-full flex items-center justify-center relative z-20">
            {
                expense.category.name === "Courses" && <ShoppingCartIcon/>
            }
            {
                expense.category.name === "Loyer" && <HouseIcon />
            }
            {
                expense.category.name === "Électricité" && <PlugIcon />
            }
            {
                expense.category.name === "Voyage" && <PlaneIcon />
            }
            {
                expense.category.name === "Restaurant" && <SoupIcon />
            }
            {
                expense.category.name === "Gaz" && <WindIcon />
            }
            {
                expense.category.name === "Loisirs" && <PuzzleIcon />
            }
        </div>
        <div className={`flex flex-1 justify-between items-center py-2 rounded-md relative`}>
            <div className = "z-20">
                <span className = "font-medium text-sm">{expense.category.name}</span>
                <div className = "flex gap-2 text-[0.7rem] text-muted-foreground">
                <span>{formatDate(expense.date)}</span>
                {
                    //date!.toISOString().substring(0, 10)
                    expense.places.length > 0 && 
                    <>
                        <span>|</span>
                        <span>{expense.places[0].name}</span>
                    </>
                }
                </div>
            </div>
            <span className="z-20 font-bold">{expense.amount}€</span>
        </div>
    </div>
  )
}

export default ExpenseDetails
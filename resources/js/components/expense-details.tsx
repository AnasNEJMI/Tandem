import { Expense } from '@/types'
import { HouseIcon, PlaneIcon, PlugIcon, PuzzleIcon, ShoppingCartIcon, SoupIcon, WindIcon } from 'lucide-react'

const expenseCategories = ["Tout","Courses","Loyer","Électricité","Gaz","Voyage","Restaurant","Loisirs"];

const ExpenseDetails = ({expense} : {expense : Expense}) => {
  return (
    <div className={`flex items-center gap-4 rounded-md bg-card-border border border-card-border before:bg-white relative before:absolute before:w-full before:h-full before:z-10 before:left-0 before:-top-1 before:rounded-md  px-4`}>
        <div className='absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full w-4 h-4 bg-black text-white flex items-center justify-center z-30 text-xs'>
            {expense.spender[0]}
        </div>
        <div className="rounded-full flex items-center justify-center relative z-20">
            {
                expense.category === "Courses" && <ShoppingCartIcon />
            }
            {
                expense.category === "Loyer" && <HouseIcon />
            }
            {
                expense.category === "Électricité" && <PlugIcon />
            }
            {
                expense.category === "Voyage" && <PlaneIcon />
            }
            {
                expense.category === "Restaurant" && <SoupIcon />
            }
            {
                expense.category === "Gaz" && <WindIcon />
            }
            {
                expense.category === "Loisirs" && <PuzzleIcon />
            }
        </div>
        <div className={`flex flex-1 justify-between items-center py-2 rounded-md relative`}>
        <div className = "z-20">
            <span className = "font-medium text-sm">{expense.category}</span>
            <div className = "flex gap-2 text-[0.7rem] text-muted-foreground">
            <span>{expense.date}</span>
            {
                //date!.toISOString().substring(0, 10)
                expense.place && 
                <>
                    <span>|</span>
                    <span>{expense.place}</span>
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
import { Category, Expense, Spender } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import ExpenseDetails from './expense-details';
import { ExpensesDetailsFiltersSidebar } from './expenses-details-filters-sidebar';
import { useEffect, useState } from 'react';
import { InfoIcon } from 'lucide-react';

interface ExpensesRecapCardProp{
    expenses : Expense[],
    categories : Category[],
    spenders : Spender[],
}

// const expenseCategories = ["Tout","Courses","Loyer","Électricité","Gaz","Voyage","Restaurant","Loisirs"];
// const expenseSpenders = ["Anas", "Elham"];
const expenseOrderBy = "Date";
const expenseOrderByDirection = "Décroissant";

const ExpensesDetailsCard = ({expenses, categories, spenders} : ExpensesRecapCardProp) => {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>(categories);
    const [selectedSpenders, setSelectedSpenders] = useState<Spender[]>(spenders);
    const [orderBy, setOrderBy] = useState<"Montant" | "Date">(expenseOrderBy);
    const [orderByDirection, setOrderByDirection] = useState<"Croissant" | "Décroissant">(expenseOrderByDirection);
    const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);
    
    useEffect(() => {
        var filterExpenses = expenses.filter((expense) => selectedCategories.some((cat) => cat.id === expense.category.id) && selectedSpenders.some((sp) => sp.id === expense.spender.id));
        if(orderBy == "Date"){
            filterExpenses = sortExpensesByDate(filterExpenses, orderByDirection)
        }else if(orderBy == "Montant"){
            filterExpenses = sortExpensesByAmount(filterExpenses, orderByDirection)
        }

        setFilteredExpenses(filterExpenses);
    }, [selectedCategories, selectedSpenders, orderBy, orderByDirection])
    
    useEffect(() => {
        var filterExpenses = expenses.filter((expense) => selectedCategories.some((cat) => cat.id === expense.category.id) && selectedSpenders.some((sp) => sp.id === expense.spender.id));
        if(orderBy == "Date"){
            filterExpenses = sortExpensesByDate(filterExpenses, orderByDirection)
        }else if(orderBy == "Montant"){
            filterExpenses = sortExpensesByAmount(filterExpenses, orderByDirection)
        }

        setFilteredExpenses(filterExpenses);
    }, [expenses])
    

    function sortExpensesByDate(expenses : Expense[], direction : "Croissant" | "Décroissant"){
            return expenses.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                
                return direction === "Croissant"? dateA - dateB : dateB - dateA;
            })
        }

        function sortExpensesByAmount(expenses : Expense[], direction : "Croissant" | "Décroissant"){
            return expenses.sort((a, b) => {
                const amountA = a.amount;
                const amountB = b.amount;

                return direction === "Croissant"? amountA - amountB : amountB - amountA;
            })
        }
    
    return (
    <div className=' mt-6'>
        <div className='w-full text-left flex flex-row items-center justify-between'>
            <h2 className='text-sm font-bold text-muted-foreground'>Dépenses du mois</h2>
            <ExpensesDetailsFiltersSidebar 
                categories = {categories}
                spenders = {spenders}
                selectedCategories = {selectedCategories}
                selectedSpenders = {selectedSpenders}
                orderBy = {orderBy}
                orderByDirection = {orderByDirection}
                setSelectedCategories = {setSelectedCategories}
                setSelectedSpenders = {setSelectedSpenders}
                setOrderBy = {setOrderBy}
                setOrderByDirection = {setOrderByDirection}
            />
        </div>
        <div className='flex flex-col scrollabe-element pb-20'>
            <ul className='flex flex-col max-h-[350px] gap-4 pt-4'>
                {
                    filteredExpenses.length > 0 && filteredExpenses.map((expense, index) => <ExpenseDetails expense={expense} key={index} />)
                }
                {
                    filteredExpenses.length === 0 && <div className='text-muted-foreground flex gap-2 w-full justify-center items-center text-sm flex-col'><InfoIcon size={32}/> <span className='text-pretty text-center'>Aucune dépense qui correspond aux filtres sélectionnés.</span></div>
                }
            </ul>
        </div>
        {/* <Card className="rounded-xl bg-white opacity-100 translate-y-0 duration-750 starting:opacity-0 starting:translate-y-6 transition-all">
            <CardContent className=" flex flex-col scrollabe-element gap-2">
                <div className='flex flex-col gap-2 max-h-[350px] pt-6'>
                {
                    filteredExpenses.length > 0 && filteredExpenses.map((expense, index) => <ExpenseDetails expense={expense} key={index} />)
                }
                {
                    filteredExpenses.length === 0 && <div className='text-muted-foreground flex gap-2 w-full justify-center items-center text-sm flex-col'><InfoIcon size={32}/> <span className='text-pretty text-center'>Aucune dépense qui correspond aux filtres sélectionnés.</span></div>
                }
                </div>
            </CardContent>
        </Card> */}
    </div>
  )
}

export default ExpensesDetailsCard
import { Expense } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import ExpenseDetails from './expense-details';
import { ExpensesDetailsFiltersSidebar } from './expenses-details-filters-sidebar';
import { useEffect, useState } from 'react';

interface ExpensesRecapCardProp{
    expenses : Expense[];
}

const expenseCategories = ["Tout","Courses","Loyer","Électricité","Gaz","Voyage","Restaurant","Loisirs"];
const expenseSpenders = ["Anas", "Elham"];
const expenseOrderBy = "Date";
const expenseOrderByDirection = "Croissant";
const ExpensesDetailsCard = ({expenses} : ExpensesRecapCardProp) => {
    const [categories, setCategories] = useState<string[]>(expenseCategories);
    const [spenders, setSpenders] = useState<string[]>(expenseSpenders);
    const [orderBy, setOrderBy] = useState<"Montant" | "Date">(expenseOrderBy);
    const [orderByDirection, setOrderByDirection] = useState<"Croissant" | "Décroissant">(expenseOrderByDirection);
    const [filteredExpenses, setFilteredExpenses] = useState(expenses);
    
    useEffect(() => {

        var filterExpenses = expenses.filter((expense) => categories.includes(expense.category) && spenders.includes(expense.spender));
        if(orderBy == "Date"){
            filterExpenses = sortExpensesByDate(filterExpenses, orderByDirection)
        }else if(orderBy == "Montant"){
            filterExpenses = sortExpensesByAmount(filterExpenses, orderByDirection)
        }

        setFilteredExpenses(filterExpenses);
    }, [categories, spenders, orderBy, orderByDirection])
    
    useEffect(() => {
        console.log('expenses changed :', expenses);
        var filterExpenses = expenses.filter((expense) => categories.includes(expense.category) && spenders.includes(expense.spender));
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
    <Card className="rounded-xl mt-6  opacity-100 translate-y-0 duration-750 starting:opacity-0 starting:translate-y-6 transition-all">
        <CardHeader className="px-6 w-full pt-2 pb-0 text-left flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Détails</CardTitle>
            <ExpensesDetailsFiltersSidebar 
                categories = {categories}
                spenders = {spenders}
                orderBy = {orderBy}
                orderByDirection = {orderByDirection}
                setCategories = {setCategories}
                setSpenders = {setSpenders}
                setOrderBy = {setOrderBy}
                setOrderByDirection = {setOrderByDirection}
            />
        </CardHeader>
        <CardContent className=" flex flex-col scrollabe-element gap-2">
            <div className='flex flex-col gap-4 max-h-[350px] pt-6'>
            {
                filteredExpenses.map((expense, index) => <ExpenseDetails expense={expense} key={index} />)
            }
            </div>
        </CardContent>
    </Card>
  )
}

export default ExpensesDetailsCard
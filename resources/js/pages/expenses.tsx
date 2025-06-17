import { AddExpenseDrawer } from '@/components/add-expense-drawer';
import ExpensesDetailsCard from '@/components/expenses-details-card';
import { ExpensesDistributionChart } from '@/components/expenses-distribution-chart';
import ExpensesMonthYearSelect from '@/components/expenses-month-year-select';
import ExpensesPresentationElement from '@/components/expenses-presentation-element';
import ExpensesDistributionPerUserChart from '@/components/expenses-distribution-per-user-chart';
import ExpensesMobileLayout from '@/layouts/mobile/expenses-mobile-layout';
import { CategoryWithPlaces, Expense, MonthAndYear, MonthlyCategoryStats, MonthlyStats, Spender, type SharedData } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';
import {useEffect, useState } from 'react';

interface ExpensesProps{
    expenses : Expense[];
    categories : CategoryWithPlaces[],
    spenders : Spender[]
    date: MonthAndYear,
    stats : MonthlyStats,
    amount : number
}

export default function Expenses({expenses, categories, spenders, date, stats, amount} : ExpensesProps) {
    const [showExpensesRecapCard, setShowExpensesRecapCard] = useState(true);
    const [showExpensesRepartitionCard, setShowExpensesRepartitionCard] = useState(true);
    const [showExpensesDetailsCard, setShowExpensesDetailsCard] = useState(true);
    
    // const { auth } = usePage<SharedData>().props;
    const {data, setData, post, processing, errors} = useForm({
        'date' : new Date(date.year, date.month -1),
    })
    
    const onDateChange = (date : Date) => {
        setData('date', date);
    }
    return (
        <>
            <Head title="Expenses">
                {/* <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" /> */}
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=''/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap" rel="stylesheet"></link>
            </Head>
            <ExpensesMobileLayout 
                showExpensesRecapCard = {showExpensesRecapCard}
                showExpensesRepartitionCard = {showExpensesRepartitionCard}
                showExpensesDetailsCard = {showExpensesDetailsCard}
                setShowExpensesRecapCard = {setShowExpensesRecapCard}
                setShowExpensesRepartitionCard = {setShowExpensesRepartitionCard}
                setShowExpensesDetailsCard = {setShowExpensesDetailsCard}

                categories = {categories}
                spenders = {spenders}
            >
                <ExpensesMonthYearSelect date = {data.date} onChange={onDateChange}/>
                {
                    expenses.length > 0  && 
                    <ExpensesPresentationElement expenses = {expenses}/>
                }
                {
                    expenses.length > 0 && 
                    <ExpensesDistributionChart totalExpenses={expenses.length} amount={amount} stats={stats.categories}/>
                }
                {
                    expenses.length > 0 && 
                    <ExpensesDistributionPerUserChart totalExpenses={expenses.length} stats = {stats.spenders}/>
                }
                {
                    showExpensesDetailsCard && expenses.length > 0 &&
                    <ExpensesDetailsCard expenses = {expenses} categories={categories} spenders={spenders}/>
                }

                {
                    expenses.length === 0 && <div className='text-muted-foreground flex gap-2 w-full justify-center items-center text-sm flex-col grow'><InfoIcon size={32}/> <span className='text-pretty text-center'>Vous n'avez aucune dépense enregistrée pour ce mois.</span></div>
                }
            </ExpensesMobileLayout>
        </>
    );
}

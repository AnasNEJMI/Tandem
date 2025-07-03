import { ExpensesAddExpenseDrawer } from '@/components/expenses/expenses-add-expense-drawer';
import ExpensesDetailsSection from '@/components/expenses/expenses-details-section';
import { ExpensesPerCategoryDistributionSection } from '@/components/expenses/expenses-per-category-distribution-section';
import ExpensesMonthYearSelect from '@/components/expenses/expenses-month-year-select';
import ExpensesTotalAmountHeader from '@/components/expenses/expenses-total-amount-header';
import ExpensesDistributionPerUserChart from '@/components/expenses/expenses-per-user-distribution-section';
import ExpensesLayout from '@/layouts/mobile/expenses-layout';
import { CategoryWithPlaces, Expense, MonthAndYear, MonthlyCategoryStats, MonthlyStats, Preferences, Spender, type SharedData } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';
import {useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ExpensesProps{
    expenses : Expense[];
    categories : CategoryWithPlaces[],
    spenders : Spender[],
    preferences : Preferences,
    date: MonthAndYear,
    stats : MonthlyStats,
    amount : number
}

export default function Expenses({expenses, categories, spenders, preferences, date, stats, amount} : ExpensesProps) {
    const [showExpensesRecapCard, setShowExpensesRecapCard] = useState(true);
    const [showExpensesRepartitionCard, setShowExpensesRepartitionCard] = useState(true);
    const [showExpensesDetailsCard, setShowExpensesDetailsCard] = useState(true);
    
    const isLargeScreen = useMediaQuery("(min-width: 1024px)")
    // const { auth } = usePage<SharedData>().props;
    const {data, setData, post, processing, errors} = useForm({
        'date' : new Date(date.year, date.month -1),
    })
    
    const onDateChange = (date : Date) => {
        setData('date', date);
    }

    useEffect(() => {
        console.log('preferences ', preferences);
    }, [preferences])
    
    return (
        <>
            <Head title="Expenses">
                {/* <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" /> */}
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=''/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap" rel="stylesheet"></link>
            </Head>
            <ExpensesLayout 
                categories = {categories}
                spenders = {spenders}
                preferences={preferences}
            >
                <ExpensesMonthYearSelect date = {data.date} onChange={onDateChange} className='lg:bg-background'/>
                {
                    expenses.length > 0  && !isLargeScreen &&
                    <>
                        <ExpensesTotalAmountHeader preferences = {preferences} expenses = {expenses}/>
                        <ExpensesPerCategoryDistributionSection preferences = {preferences} totalExpenses={expenses.length} amount={amount} stats={stats.categories}/>
                        <ExpensesDistributionPerUserChart preferences = {preferences} totalExpenses={expenses.length} stats = {stats.spenders}/>
                        <ExpensesDetailsSection preferences = {preferences} expenses = {expenses} categories={categories} spenders={spenders}/>
                    </>
                }
                {
                    expenses.length > 0  && isLargeScreen &&
                    <div>
                        <ExpensesTotalAmountHeader preferences = {preferences} expenses = {expenses}/>
                        
                        <div className='flex gap-8'>
                            <div className='flex-1'>
                                <ExpensesPerCategoryDistributionSection preferences = {preferences} totalExpenses={expenses.length} amount={amount} stats={stats.categories}/>
                                <ExpensesDistributionPerUserChart preferences = {preferences} totalExpenses={expenses.length} stats = {stats.spenders}/>
                            </div>
                            <ExpensesDetailsSection className='mt-6 flex-1' preferences = {preferences} expenses = {expenses} categories={categories} spenders={spenders}/>

                        </div>
                    </div>
                }
                
                {
                    expenses.length === 0 && <div className='text-muted-foreground flex gap-2 w-full justify-center items-center text-sm flex-col grow'><InfoIcon size={32}/> <span className='text-pretty text-center'>Vous n'avez aucune dépense enregistrée pour ce mois.</span></div>
                }
            </ExpensesLayout>
        </>
    );
}

import ExpensesDetailsCard from '@/components/expenses-details-card';
import ExpensesRecapCard from '@/components/expenses-recap-card';
import ExpensesRepartitionCard from '@/components/expenses-repartition-card';
import ExpensesMobileLayout from '@/layouts/mobile/expenses-mobile-layout';
import { CategoryWithPlaces, Expense, Spender, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {useEffect, useState } from 'react';

interface ExpensesProps{
    expenses : Expense[];
    categories : CategoryWithPlaces[],
    spenders : Spender[]
}

export default function Expenses({expenses, categories, spenders} : ExpensesProps) {
    const [showExpensesRecapCard, setShowExpensesRecapCard] = useState(true);
    const [showExpensesRepartitionCard, setShowExpensesRepartitionCard] = useState(true);
    const [showExpensesDetailsCard, setShowExpensesDetailsCard] = useState(true);
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
      console.log('expenses : ', expenses);
      console.log('categories : ', categories);
      console.log('spenders : ', spenders);
    }, [])

    useEffect(() => {
      console.log('updated expenses : ', expenses);
    }, [expenses])

    return (
        <>
            <Head title="Expenses">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            {/* <Home/> */}
            {/* <Login canResetPassword = {false}/>
            <Register/> */}
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
                {
                    showExpensesRecapCard && 
                    <ExpensesRecapCard expenses={expenses}/>
                }
                {
                    showExpensesRepartitionCard &&
                    <ExpensesRepartitionCard expenses={expenses}/>
                }
                {
                    showExpensesDetailsCard &&
                    <ExpensesDetailsCard expenses = {expenses} categories={categories} spenders={spenders}/>
                }
                
            </ExpensesMobileLayout>
        </>
    );
}

import ExpensesDetailsCard from '@/components/expenses-details-card';
import ExpensesRecapCard from '@/components/expenses-recap-card';
import ExpensesRepartitionCard from '@/components/expenses-repartition-card';
import AuthLayout from '@/layouts/auth-layout';
import AuthCardLayout from '@/layouts/auth/auth-card-layout';
import ExpensesMobileLayout from '@/layouts/expenses-mobile-layout';
import { Expense, type SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import Login from './auth/login';
import Register from './auth/register';

interface WelcomeProps{
    expenses : Expense[];
}

export default function Welcome({expenses} : WelcomeProps) {
    const [showExpensesRecapCard, setShowExpensesRecapCard] = useState(true);
    const [showExpensesRepartitionCard, setShowExpensesRepartitionCard] = useState(true);
    const [showExpensesDetailsCard, setShowExpensesDetailsCard] = useState(true);
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Register/>
            <ExpensesMobileLayout 
                showExpensesRecapCard = {showExpensesRecapCard}
                showExpensesRepartitionCard = {showExpensesRepartitionCard}
                showExpensesDetailsCard = {showExpensesDetailsCard}
                setShowExpensesRecapCard = {setShowExpensesRecapCard}
                setShowExpensesRepartitionCard = {setShowExpensesRepartitionCard}
                setShowExpensesDetailsCard = {setShowExpensesDetailsCard}
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
                    <ExpensesDetailsCard expenses = {expenses}/>
                }
                {/* <div className="flex w-full items-start justify-center flex-col opacity-100 transition-opacity duration-750 starting:opacity-0 border border-zinc-200 rounded-md">
                    <div className='flex flex-col border border-zinc-100 rounded-md p-6 h-min'>
                        <h1 className='font-bold'>Add Expense</h1>
                        <form onSubmit={handleFormSubmit} className='flex items-start justify-start flex-col gap-6 mt-6'>
                            <input name = 'amount' type ='number' step = '0.01' placeholder='Amount' value = {form.amount} onChange={handleFormChange} className='border border-zinc-300 p-2 rounded-sm w-[300px]'  required/>
                            <input name = 'spender' type ='text' placeholder='Spender' value = {form.spender} onChange={handleFormChange} className='border border-zinc-300 p-2 rounded-sm w-[300px]'  required/>
                            <input name = 'date' type ='date' placeholder='Date' value = {form.date} onChange={handleFormChange} className='border border-zinc-300 p-2 rounded-sm w-[300px]' required/>
                            <input name = 'category' type ='text' placeholder='Category' value = {form.category} onChange={handleFormChange} className='border border-zinc-300 p-2 rounded-sm w-[300px]' required/>
                            <input name = 'place' type ='text' placeholder='Place' value = {form.place} onChange={handleFormChange} className='border border-zinc-300 p-2 rounded-sm w-[300px]' required/>
                            <textarea name = 'comment' placeholder='Comment' value = {form.comment} onChange={handleFormChange} className='border border-zinc-300 p-2 rounded-sm w-[300px]'/>
                            <button type='submit' className='border border-black px-4 py-2 w-full rounded-md cursor-pointer hover:bg-zinc-100'>Enregister</button>
                        </form>
                    </div>

                    <div className='flex flex-col border border-zinc-100 rounded-md p-6 grow'>
                        <h1 className='font-bold'>List of expenses</h1>
                        <ul className='flex flex-col w-full gap-6'>
                            {expenses.map((expense, index) => (
                                <li key={index} className='flex flex-col gap-2 w-full'>
                                    <span>{expense.amount}</span>
                                    <span>{expense.spender}</span>
                                    <span>{expense.category}</span>
                                    <span>{expense.date}</span>
                                    <span>{expense.place}</span>
                                    <span>{expense.comment}</span>
                                </li>
                            ))}
                        </ul>
                        <h1 className='font-bold'>List of expenses</h1>
                        <ul className='flex flex-col w-full gap-6'>
                            {expenses.map((expense, index) => (
                                <li key={index} className='flex flex-col gap-2 w-full'>
                                    <span>{expense.amount}</span>
                                    <span>{expense.spender}</span>
                                    <span>{expense.category}</span>
                                    <span>{expense.date}</span>
                                    <span>{expense.place}</span>
                                    <span>{expense.comment}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div> */}
            </ExpensesMobileLayout>
        </>
    );
}

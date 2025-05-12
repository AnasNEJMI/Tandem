import { Expense, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import exp from 'constants';
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react';

interface WelcomeProps{
    expenses : Expense[];
}

export default function Welcome({expenses} : WelcomeProps) {
    const { auth } = usePage<SharedData>().props;
    const [form, setForm] = useState({
        amount : '',
        spender : '',
        date : '',
        category : '',
        place : '',
        comment : '',
    })

    const handleFormSubmit = (e : FormEvent) => {
        e.preventDefault();
        router.post('/expenses', form);
    }
    
    const handleFormChange = (e : ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>) => {
        setForm({... form, [e.target.name] : e.target.value})
    }

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center p-6 lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full text-sm not-has-[nav]:hidden ">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-start justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 border border-zinc-200 rounded-md">
                    <main className="flex w-full p-6 gap-8">
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
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

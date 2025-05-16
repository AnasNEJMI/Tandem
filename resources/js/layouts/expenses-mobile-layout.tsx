import React, { useRef } from 'react';
import {motion, useScroll, useTransform} from 'motion/react';
import MobileNav from '@/components/mobile-nav';
import ParamsIconDropdownMenu from '@/components/params-icon-dropdown-menu';
import { AddExpenseDrawer } from '@/components/add-expense-drawer';

const ExpensesMobileLayout = ({children,showExpensesRecapCard, showExpensesRepartitionCard, showExpensesDetailsCard, setShowExpensesRecapCard, setShowExpensesRepartitionCard, setShowExpensesDetailsCard}
                            :{children : React.ReactNode,
                              showExpensesRecapCard : boolean,
                              showExpensesRepartitionCard : boolean,
                              showExpensesDetailsCard : boolean,
                              setShowExpensesRecapCard : React.Dispatch<React.SetStateAction<boolean>>,
                              setShowExpensesRepartitionCard : React.Dispatch<React.SetStateAction<boolean>>,
                              setShowExpensesDetailsCard :React.Dispatch<React.SetStateAction<boolean>>}) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const pathname = window.location.pathname;
    const title = pathname==="/"? "Dépenses" : pathname === "/bilans" ? "Bilans" : "Paramètres";
    const {scrollYProgress} = useScroll({
        target : targetRef,
        offset:["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0,0.5], [0,70]);
    const opacityTitle = useTransform(scrollYProgress, [0, 0.4], [1,0]);
    const opacityHeader = useTransform(scrollYProgress, [0.6,1], [0,1]);

    return (
    <div className='relative min-h-[100svh] flex flex-col'>
        <div className='relative z-10 flex flex-col px-6'>
            <motion.div
            ref = {targetRef}
            style={{y : y, opacity : opacityTitle}}
            className='flex gap-4 items-center justify-center'
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 aspect-square text-typography">
                    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/>
                    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>
                </svg>
                <h3 className='text-4xl font-medium relative left-0 h-60 flex items-center justify-center z-[1]'>
                    {title}
                </h3>
            </motion.div>
        </div>
        <main className='relative z-20 pb-32'>
            <header className='bg-background flex items-center justify-between py-4 w-full sticky top-0 left-0 px-6 z-20'>
              <motion.div style={{opacity : opacityHeader}} className='gap-2 flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 aspect-square text-typography">
                  <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/>
                  <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>
                </svg>
                <h3  className='text-xl font-medium text-typography'>{title}</h3>
              </motion.div>
              <div className='flex gap-2 items-center justify-center'>
                <AddExpenseDrawer />
                <ParamsIconDropdownMenu
                  showExpensesRecapCard = {showExpensesRecapCard}
                  showExpensesRepartitionCard = {showExpensesRepartitionCard}
                  showExpensesDetailsCard = {showExpensesDetailsCard}
                  setShowExpensesRecapCard = {setShowExpensesRecapCard}
                  setShowExpensesRepartitionCard = {setShowExpensesRepartitionCard}
                  setShowExpensesDetailsCard = {setShowExpensesDetailsCard}
                />
              </div>
            </header>
            <div className='px-6 relative z-10'> 
                {children}
            </div>
        </main>
        <MobileNav/>
    </div>
  )
}

export default ExpensesMobileLayout
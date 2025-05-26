import React, { useRef, useState } from 'react';
import {motion, useScroll, useTransform} from 'motion/react';
import ParamsIconDropdownMenu from '@/components/params-icon-dropdown-menu';
import { AddExpenseDrawer } from '@/components/add-expense-drawer';
import MobileLayout from './mobile-layout';
import { WalletIcon } from 'lucide-react';
import { CategoryWithPlaces, Spender } from '@/types';
import { cn } from '@/lib/utils';

const title = "Dépenses";

const ExpensesMobileLayout = ({className, children,categories, spenders,showExpensesRecapCard, showExpensesRepartitionCard, showExpensesDetailsCard, setShowExpensesRecapCard, setShowExpensesRepartitionCard, setShowExpensesDetailsCard}
                            :{className? : string,
                              children : React.ReactNode,
                              showExpensesRecapCard : boolean,
                              showExpensesRepartitionCard : boolean,
                              showExpensesDetailsCard : boolean,
                              setShowExpensesRecapCard : React.Dispatch<React.SetStateAction<boolean>>,
                              setShowExpensesRepartitionCard : React.Dispatch<React.SetStateAction<boolean>>,
                              setShowExpensesDetailsCard :React.Dispatch<React.SetStateAction<boolean>>
                              categories : CategoryWithPlaces[],
                              spenders : Spender[],
                            }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const targetRef = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll({
        target : targetRef,
        offset:["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0,0.5], [0,70]);
    const opacityTitle = useTransform(scrollYProgress, [0, 0.4], [1,0]);
    const opacityHeader = useTransform(scrollYProgress, [0.3,1], [0,1]);

    return (
    <>
      <MobileLayout className={cn('', className)}>
        <div className='relative z-10 flex flex-col px-6'>
            <motion.div
            ref = {targetRef}
            style={{y : y, opacity : opacityTitle}}
            className='flex gap-4 items-center justify-center'
            >
                <WalletIcon className='w-8 h-8'/>
                <h3 className='text-4xl font-bold relative left-0 h-60 flex items-center justify-center z-[1]'>
                    {title}
                </h3>
            </motion.div>
        </div>
        <main className='relative z-20 pb-32 grow flex flex-col'>
            <header className='bg-background flex items-center justify-between py-4 w-full sticky top-0 left-0 px-6 z-20'>
              <motion.div style={{opacity : opacityHeader}} className='gap-2 flex items-center'>
                <WalletIcon/>
                <h3  className='text-xl font-bold text-typography'>{title}</h3>
              </motion.div>
              <div className='flex gap-2 items-center justify-center'>
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
            <div className='px-6 relative z-10 grow flex flex-col'> 
                {children}
            </div>
        </main>
    </MobileLayout>
    <div className='fixed bottom-28 right-4 z-50'>
      <AddExpenseDrawer open = {drawerOpen} setOpen = {setDrawerOpen} categories = {categories} spenders = {spenders}/>
    </div>
    </>
  )
}

export default ExpensesMobileLayout
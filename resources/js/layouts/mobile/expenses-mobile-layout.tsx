import React, { useRef } from 'react';
import {motion, useScroll, useTransform} from 'motion/react';
import ParamsIconDropdownMenu from '@/components/params-icon-dropdown-menu';
import { AddExpenseDrawer } from '@/components/add-expense-drawer';
import MobileLayout from './mobile-layout';
import { WalletIcon } from 'lucide-react';

const title = "Dépenses";

const ExpensesMobileLayout = ({children,showExpensesRecapCard, showExpensesRepartitionCard, showExpensesDetailsCard, setShowExpensesRecapCard, setShowExpensesRepartitionCard, setShowExpensesDetailsCard}
                            :{children : React.ReactNode,
                              showExpensesRecapCard : boolean,
                              showExpensesRepartitionCard : boolean,
                              showExpensesDetailsCard : boolean,
                              setShowExpensesRecapCard : React.Dispatch<React.SetStateAction<boolean>>,
                              setShowExpensesRepartitionCard : React.Dispatch<React.SetStateAction<boolean>>,
                              setShowExpensesDetailsCard :React.Dispatch<React.SetStateAction<boolean>>}) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll({
        target : targetRef,
        offset:["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0,0.5], [0,70]);
    const opacityTitle = useTransform(scrollYProgress, [0, 0.4], [1,0]);
    const opacityHeader = useTransform(scrollYProgress, [0.6,1], [0,1]);

    return (
    <MobileLayout>
        <div className='relative z-10 flex flex-col px-6'>
            <motion.div
            ref = {targetRef}
            style={{y : y, opacity : opacityTitle}}
            className='flex gap-4 items-center justify-center'
            >
                <WalletIcon className='w-8 h-8'/>
                <h3 className='text-4xl font-medium relative left-0 h-60 flex items-center justify-center z-[1]'>
                    {title}
                </h3>
            </motion.div>
        </div>
        <main className='relative z-20 pb-32'>
            <header className='bg-background flex items-center justify-between py-4 w-full sticky top-0 left-0 px-6 z-20'>
              <motion.div style={{opacity : opacityHeader}} className='gap-2 flex items-center'>
                <WalletIcon/>
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
    </MobileLayout>
  )
}

export default ExpensesMobileLayout
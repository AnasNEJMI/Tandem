import React, { useRef, useState } from 'react';
import {motion, useScroll, useTransform} from 'motion/react';
import ParamsIconDropdownMenu from '@/components/params-icon-dropdown-menu';
import { ExpensesAddExpenseDrawer } from '@/components/expenses/expenses-add-expense-drawer';
import MobileLayout from './mobile-layout';
import { WalletIcon } from 'lucide-react';
import { CategoryWithPlaces, Preferences, Spender } from '@/types';
import { cn } from '@/lib/utils';
import DesktopLayout from '../desktop/desktop-layout';
import { useMediaQuery } from '@/hooks/use-media-query';

const title = "Dépenses";

interface ExpenseMobileLyoutProps{
  className? : string,
  children : React.ReactNode,
  categories : CategoryWithPlaces[],
  spenders : Spender[],
  preferences : Preferences
}

const ExpensesLayout = ({className, children,categories,spenders, preferences}
                            :ExpenseMobileLyoutProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")                          
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
      {
        isDesktop &&
        <DesktopLayout className={cn('', className)}>
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
              </header>
              <div style={{transitionDelay:'200ms'}} className='px-6 relative z-10 grow flex flex-col starting:opacity-0 starting:translate-y-8 opacity-100 translate-y-0 transition-all duration-500 ease-out'> 
                  {children}
              </div>
          </main>
        </DesktopLayout>
      }
      {
        !isDesktop &&
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
              </header>
              <div style={{transitionDelay:'200ms'}} className='px-6 relative z-10 grow flex flex-col starting:opacity-0 starting:translate-y-8 opacity-100 translate-y-0 transition-all duration-500 ease-out'> 
                  {children}
              </div>
          </main>
        </MobileLayout>

      }
      <div className={`fixed ${isDesktop? 'bottom-16 right-16' :'bottom-28 right-4' }  z-50`}>
        <ExpensesAddExpenseDrawer preferences = {preferences} open = {drawerOpen} setOpen = {setDrawerOpen} categories = {categories} spenders = {spenders}/>
      </div>
    </>
  )
}

export default ExpensesLayout
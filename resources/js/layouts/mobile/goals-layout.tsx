import React, { useRef } from 'react'
import MobileLayout from './mobile-layout'
import { motion, useScroll, useTransform } from 'motion/react';
import {FlagIcon } from 'lucide-react';
import GoalsAddGoalSheet from '@/components/goals/goals-add-goal-sheet';
import { Category, Spender } from '@/types';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import DesktopLayout from '../desktop/desktop-layout';

const title = "Objectifs";

interface GoalsMobileLayoutProps {
    className? : string,
    children : React.ReactNode,
    categories : Category[],
    spenders : Spender[]
}

const GoalsLayout = ({children, className, categories, spenders} : GoalsMobileLayoutProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const targetRef = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll({
        target : targetRef,
        offset:["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0,0.5], [0,70]);
    const opacityTitle = useTransform(scrollYProgress, [0, 0.4], [1,0]);
    const opacityHeader = useTransform(scrollYProgress, [0.6,1], [0,1]);
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
                <FlagIcon/>
                <h3 className='text-4xl font-medium relative left-0 h-60 flex items-center justify-center z-[1]'>
                {title}
                </h3>
                </motion.div>
                </div>
                <main className='relative z-20 pb-32'>
                    <header className='bg-background flex items-center justify-between py-4 w-full sticky top-0 left-0 px-6 z-20'>
                    <motion.div style={{opacity : opacityHeader}} className='gap-2 flex items-center'>
                        <FlagIcon/>
                        <h3  className='text-xl font-medium text-typography'>{title}</h3>
                    </motion.div>
                    
                    </header>
                    <div className='px-6 relative z-10 starting:opacity-0 starting:translate-y-8 opacity-100 translate-y-0 transition-all duration-500 ease-out'> 
                    {children}
                    </div>
                    <div className={`fixed ${isDesktop? 'bottom-16 right-16' :'bottom-28 right-4' }  z-50`}>
                    <GoalsAddGoalSheet categories={categories} spenders={spenders}/>
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
                        <FlagIcon/>
                        <h3 className='text-4xl font-medium relative left-0 h-60 flex items-center justify-center z-[1]'>
                            {title}
                        </h3>
                    </motion.div>
                </div>
                <main className='relative z-20 pb-32'>
                    <header className='bg-background flex items-center justify-between py-4 w-full sticky top-0 left-0 px-6 z-20'>
                    <motion.div style={{opacity : opacityHeader}} className='gap-2 flex items-center'>
                        <FlagIcon/>
                        <h3  className='text-xl font-medium text-typography'>{title}</h3>
                    </motion.div>
                    
                    </header>
                    <div className='px-6 relative z-10 starting:opacity-0 starting:translate-y-8 opacity-100 translate-y-0 transition-all duration-500 ease-out'> 
                        {children}
                    </div>
                    <div className={`fixed ${isDesktop? 'bottom-16 right-16' :'bottom-28 right-4' }  z-50`}>
                        <GoalsAddGoalSheet categories={categories} spenders={spenders}/>
                    </div>
                </main>
            </MobileLayout>
        }
    </>
  )
}

export default GoalsLayout
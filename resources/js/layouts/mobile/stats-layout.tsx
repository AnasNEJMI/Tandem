import React, { useRef } from 'react'
import MobileLayout from './mobile-layout'
import { motion, useScroll, useTransform } from 'motion/react';
import { ChartLineIcon } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import DesktopLayout from '../desktop/desktop-layout';
import { cn } from '@/lib/utils';

const title = "Statistiques";

interface StatsLayoutProps{
    className? : string,
    children : React.ReactNode,
}

const StatsLayout = ({className, children} : StatsLayoutProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")                           
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
            <DesktopLayout>
                <div className='relative z-10 flex flex-col px-6'>
                    <motion.div
                    ref = {targetRef}
                    style={{y : y, opacity : opacityTitle}}
                    className='flex gap-4 items-center justify-center'
                    >
                        <ChartLineIcon/>
                        <h3 className='text-4xl font-medium relative left-0 h-60 flex items-center justify-center z-[1]'>
                            {title}
                        </h3>
                    </motion.div>
                </div>
                <main className='relative z-20 pb-32'>
                    <header className='bg-background flex items-center justify-between py-4 w-full sticky top-0 left-0 px-6 z-20'>
                    <motion.div style={{opacity : opacityHeader}} className='gap-2 flex items-center'>
                        <ChartLineIcon/>
                        <h3  className='text-xl font-medium text-typography'>{title}</h3>
                    </motion.div>
                    
                    </header>
                    <div style={{transitionDelay:'200ms'}} className={cn('px-6 w-full relative z-10 starting:opacity-0 starting:translate-y-8 opacity-100 translate-y-0 transition-all duration-500 ease-out flex-col items-center', className)}> 
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
                        <ChartLineIcon/>
                        <h3 className='text-4xl font-medium relative left-0 h-60 flex items-center justify-center z-[1]'>
                            {title}
                        </h3>
                    </motion.div>
                </div>
                <main className='relative z-20 pb-32'>
                    <header className='bg-background flex items-center justify-between py-4 w-full sticky top-0 left-0 px-6 z-20'>
                    <motion.div style={{opacity : opacityHeader}} className='gap-2 flex items-center'>
                        <ChartLineIcon/>
                        <h3  className='text-xl font-medium text-typography'>{title}</h3>
                    </motion.div>
                    
                    </header>
                    <div style={{transitionDelay:'200ms'}} className={cn('px-6 w-full relative z-10 starting:opacity-0 starting:translate-y-8 opacity-100 translate-y-0 transition-all duration-500 ease-out', className)}> 
                        {children}
                    </div>
                </main>
            </MobileLayout>
        }
    </>
  )
}

export default StatsLayout
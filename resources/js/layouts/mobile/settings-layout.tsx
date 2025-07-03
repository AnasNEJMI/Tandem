import React, { useRef } from 'react';
import {AnimatePresence, motion, useScroll, useTransform} from 'motion/react';
import MobileLayout from './mobile-layout';
import { ArrowLeft, SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SettingsPreferencesView from '@/components/settings/settings-preferences-view';
import SettingsCategoriesView from '@/components/settings/settings-categories-view';
import SettingsSpendersView from '@/components/settings/settings-spenders-view';
import SettingsVisualisationView from '@/components/settings/settings-visualisation-view';
import { Category, Preferences, Spender } from '@/types';
import { useMediaQuery } from '@/hooks/use-media-query';
import DesktopLayout from '../desktop/desktop-layout';

const title = "Paramètres";

interface SettingsMobileLayoutProps{
    children : React.ReactNode,
    openTab : 'profile'|'categories'|'spenders'|'visualisation'|'none',
    setOpenTab : React.Dispatch<React.SetStateAction<"profile" | "categories" | "spenders" | "visualisation" | "none">>
    categories : Category[],
    spenders : Spender[],
    preferences : Preferences,
}

const SettingsLayout = ({children, openTab, setOpenTab, categories, spenders, preferences}
                            :SettingsMobileLayoutProps) => {
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
        <DesktopLayout>
            <div className='relative z-10 flex flex-col px-6'>
                <motion.div
                ref = {targetRef}
                style={{y : y, opacity : opacityTitle}}
                className='flex gap-4 items-center justify-center'
                >
                    <SettingsIcon className='w-8 h-8'/>
                    <h3 className='text-4xl font-medium relative left-0 h-60 flex items-center justify-center z-[1]'>
                        {title}
                    </h3>
                </motion.div>
            </div>
            <main className='relative z-20 pb-32'>
                <header className='bg-background flex items-center justify-between py-4 w-full sticky top-0 left-0 px-6 z-20'>
                <motion.div style={{opacity : opacityHeader}} className='gap-2 flex items-center'>
                    <SettingsIcon />
                    <h3  className='text-xl font-medium text-typography'>{title}</h3>
                </motion.div>
                </header>
                <div className='px-6 relative z-10 starting:opacity-0 starting:translate-y-8 opacity-100 translate-y-0 transition-all duration-500 ease-out '> 
                    {children}
                </div>
                <AnimatePresence mode='wait'>
                    {
                        openTab !== 'none' &&
                        <motion.div
                            className='fixed top-0 left-0 h-screen w-full flex flex-col items-center z-50 bg-background overflow-y-auto px-6'
                            initial = {{opacity:1, y:100}}
                            animate = {{opacity:1, y:0}}
                            exit={{opacity:0, y:100}}
                            transition={{duration:0.15, ease:"easeOut"}}
                        >
                        {
                            openTab === 'profile' &&
                            <SettingsPreferencesView preferences={preferences} setOpenTab={setOpenTab}/>
                        }
                        {
                            openTab === 'categories' &&
                            <SettingsCategoriesView categories = {categories} setOpenTab={setOpenTab}/>
                        }
                        {
                            openTab === 'spenders' &&
                            <SettingsSpendersView spenders = {spenders} setOpenTab={setOpenTab}/>
                        }
                        {
                            openTab === 'visualisation' &&
                            // color='hsl(25 35% 25%)' 
                            <SettingsVisualisationView preferences={preferences} setOpenTab={setOpenTab}/>
                        }
                        </motion.div>
                    }
                </AnimatePresence>
            </main>
        </DesktopLayout>

    }
    {
        !isDesktop &&
        <MobileLayout>
            <div className='relative z-10 flex flex-col px-6'>
                <motion.div
                ref = {targetRef}
                style={{y : y, opacity : opacityTitle}}
                className='flex gap-4 items-center justify-center'
                >
                    <SettingsIcon className='w-8 h-8'/>
                    <h3 className='text-4xl font-medium relative left-0 h-60 flex items-center justify-center z-[1]'>
                        {title}
                    </h3>
                </motion.div>
            </div>
            <main className='relative z-20 pb-32'>
                <header className='bg-background flex items-center justify-between py-4 w-full sticky top-0 left-0 px-6 z-20'>
                <motion.div style={{opacity : opacityHeader}} className='gap-2 flex items-center'>
                    <SettingsIcon />
                    <h3  className='text-xl font-medium text-typography'>{title}</h3>
                </motion.div>
                </header>
                <div className='px-6 relative z-10 starting:opacity-0 starting:translate-y-8 opacity-100 translate-y-0 transition-all duration-500 ease-out '> 
                    {children}
                </div>
                <AnimatePresence mode='wait'>
                    {
                        openTab !== 'none' &&
                        <motion.div
                            className='fixed top-0 left-0 h-screen w-full z-50 bg-background overflow-y-auto px-6'
                            initial = {{opacity:1, y:100}}
                            animate = {{opacity:1, y:0}}
                            exit={{opacity:0, y:100}}
                            transition={{duration:0.15, ease:"easeOut"}}
                        >
                        {
                            openTab === 'profile' &&
                            <SettingsPreferencesView preferences={preferences} setOpenTab={setOpenTab}/>
                        }
                        {
                            openTab === 'categories' &&
                            <SettingsCategoriesView categories = {categories} setOpenTab={setOpenTab}/>
                        }
                        {
                            openTab === 'spenders' &&
                            <SettingsSpendersView spenders = {spenders} setOpenTab={setOpenTab}/>
                        }
                        {
                            openTab === 'visualisation' &&
                            // color='hsl(25 35% 25%)' 
                            <SettingsVisualisationView preferences={preferences} setOpenTab={setOpenTab}/>
                        }
                        </motion.div>
                    }
                </AnimatePresence>
            </main>
        </MobileLayout>
    }
    </>
  )
}

export default SettingsLayout
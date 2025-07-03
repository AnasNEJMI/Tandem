import React, {} from 'react';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ChartLineIcon, FlagIcon, SettingsIcon, WalletIcon } from 'lucide-react';

const DesktopLayout = ({children, className}
                            :{children : React.ReactNode, className? : string}) => {
    const pathName = window.location.pathname;


    return (
    <div className= {cn('relative min-h-screen flex w-full justify-center gap-', className)}>
        <nav className='flex flex-col items-center justify-center h-screen sticky top-0 gap-8 w-40'>
            <Link href={'/expenses'} className={`h-20 aspect-square flex items-center transition-all duration-150 ease-out justify-center flex-col rounded-xl ${pathName === "/expenses"? "bg-accent-foreground" : "bg-background"}`}>
                <WalletIcon className={`transition-all duration-150 ease-out text-xs ${pathName === "/expenses"? "invert" : ""}`}/>
                <span className={`transition-all duration-150 ease-out text-xs ${pathName === "/expenses"? "text-accent" : "text-typography"}`}>Dépenses</span>
            </Link>
            <Link href={'/stats'} className={`h-20 aspect-square flex items-center justify-center flex-col transition-all duration-150 ease-out rounded-xl ${pathName === "/stats"? "bg-accent-foreground" : "bg-background"}`}>
                <ChartLineIcon className={`transition-all duration-150 ease-out text-xs ${pathName === "/stats"? "invert" : ""}`}/>
                <span className={`transition-all duration-150 ease-out text-xs ${pathName === "/stats"? "text-accent" : "text-typography"}`}>Stats</span>
            </Link>
            <Link href={'/goals'} className={`h-20 aspect-square flex items-center justify-center flex-col rounded-xl ${pathName === "/goals"? "bg-accent-foreground" : "bg-background"}`}>
                <FlagIcon className={`text-xs ${pathName === "/goals"? "invert" : ""}`}/>
                <span className={`text-xs ${pathName === "/goals"? "text-accent" : "text-typography"}`}>Objectifs</span>
            </Link>
            <Link href={'/settings'} className={`h-20 aspect-square flex items-center justify-center flex-col rounded-xl ${pathName === "/settings"? "bg-accent-foreground" : "bg-background"}`}>
                <SettingsIcon className={`text-xs ${pathName === "/settings"? "invert" : ""}`}/>
                <span className={`text-xs ${pathName === "/settings"? "text-accent" : "text-typography"}`}>Paramètres</span>
            </Link>
        </nav>
        <div className='w-[calc(100%-10rem)] max-w-7xl'>
            {children}
        </div>
    </div>
  )
}

export default DesktopLayout
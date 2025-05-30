import { Link } from '@inertiajs/react' 
import { ChartLineIcon, FlagIcon, SettingsIcon, WalletIcon } from 'lucide-react'

const MobileNav = () => {
    const pathName = window.location.pathname;
  return (
    <footer className = "fixed z-30 bottom-0 bg-background h-24 w-full  grid grid-cols-4 p-2">
        <Link href={'/expenses'} className={`flex items-center transition-all duration-150 ease-out justify-center flex-col rounded-xl ${pathName === "/expenses"? "bg-accent-foreground" : "bg-background"}`}>
            <WalletIcon className={`transition-all duration-150 ease-out text-xs ${pathName === "/expenses"? "invert" : ""}`}/>
            <span className={`transition-all duration-150 ease-out text-xs ${pathName === "/expenses"? "text-accent" : "text-typography"}`}>Dépenses</span>
        </Link>
        <Link href={'/stats'} className={`flex items-center justify-center flex-col transition-all duration-150 ease-out rounded-xl ${pathName === "/stats"? "bg-accent-foreground" : "bg-background"}`}>
            <ChartLineIcon className={`transition-all duration-150 ease-out text-xs ${pathName === "/stats"? "invert" : ""}`}/>
            <span className={`transition-all duration-150 ease-out text-xs ${pathName === "/stats"? "text-accent" : "text-typography"}`}>Stats</span>
        </Link>
        <Link href={'/goals'} className={`flex items-center justify-center flex-col rounded-xl ${pathName === "/goals"? "bg-accent-foreground" : "bg-background"}`}>
            <FlagIcon className={`text-xs ${pathName === "/goals"? "invert" : ""}`}/>
            <span className={`text-xs ${pathName === "/goals"? "text-accent" : "text-typography"}`}>Objectifs</span>
        </Link>
        <Link href={'/settings'} className={`flex items-center justify-center flex-col rounded-xl ${pathName === "/settings"? "bg-accent-foreground" : "bg-background"}`}>
            <SettingsIcon className={`text-xs ${pathName === "/settings"? "invert" : ""}`}/>
            <span className={`text-xs ${pathName === "/settings"? "text-accent" : "text-typography"}`}>Paramètres</span>
        </Link>
    </footer>
  )
}

export default MobileNav
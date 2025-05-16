import { Link } from '@inertiajs/react'
import { ChartLineIcon, Flag, Settings, WalletIcon } from 'lucide-react'
import React from 'react'

const MobileNav = () => {

  return (
    <footer className = "fixed z-30 bottom-0 bg-background h-24 w-full  grid grid-cols-4 p-2">
        <Link href={'/'} className='flex items-center justify-center flex-col'>
            <WalletIcon/>
            <span className='text-xs'>Dépenses</span>
        </Link>
        <Link href={'/'} className='flex items-center justify-center flex-col'>
            <ChartLineIcon />
            <span className='text-xs'>Stats</span>
        </Link>
        <Link href={'/'} className='flex items-center justify-center flex-col'>
            <Flag />
            <span className='text-xs'>Objectifs</span>
        </Link>
        <Link href={'/'} className='flex items-center justify-center flex-col'>
            <Settings />
            <span className='text-xs'>Paramètres</span>
        </Link>
    </footer>
  )
}

export default MobileNav
import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'
import { Spender } from '@/types'

interface SettingsSpendersProps{
    setOpenTab : React.Dispatch<React.SetStateAction<"profile" | "categories" | "spenders" | "visualisation" | "none">>
    spenders : Spender[]
}

const SettingsSpenders = ({setOpenTab, spenders} : SettingsSpendersProps) => {
    console.log('spenders : ', spenders)
  return (
    <>
        <div className='relative w-full py-4 px-4'>
            <Button onClick={() => setOpenTab('none')} variant={'ghost'} className='w-16 h-16 rounded-full'>
                <ArrowLeft/>
            </Button>
            <span className='absolute font-bold text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Personnes</span>
        </div>
        <div className='h-px w-full bg-accent'></div>
    </>
  )
}

export default SettingsSpenders
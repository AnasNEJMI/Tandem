import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Spender } from '@/types'
import SettingsModifySpenderDialog from './settings-modify-spender-dialog'
import SettingsCreateSpenderDialog from './settings-create-spender-dialog'
import { useMediaQuery } from '@/hooks/use-media-query'

interface SettingsSpendersProps{
    setOpenTab : React.Dispatch<React.SetStateAction<"profile" | "categories" | "spenders" | "visualisation" | "none">>
    spenders : Spender[]
}

const SettingsSpendersView = ({setOpenTab, spenders} : SettingsSpendersProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")                           
  return (
    <div className='w-full max-w-xl'>
        <div className='sticky z-50 top-0 py-4 bg-background h-24'>
            <Button onClick={() => setOpenTab('none')} variant={'ghost'} className='w-16 h-16 rounded-full'>
                <ArrowLeft/>
            </Button>
            <span className='absolute font-bold text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Personnes</span>
        </div>
        <div className='h-px w-full bg-accent'></div>
        <ul className='flex flex-col gap-2 grow pb-48 mt-8'>
            {
                spenders.map((spender, index) => (
                    <SettingsModifySpenderDialog key={index} spender={spender}/>
                ))
            }
        </ul>
        <div className={`fixed ${isDesktop? 'bottom-16 right-16' :'bottom-28 right-4' }  z-50`} >
            <SettingsCreateSpenderDialog/>
        </div>
    </div>
  )
}

export default SettingsSpendersView
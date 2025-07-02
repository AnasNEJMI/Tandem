import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'
import { Spender } from '@/types'
import ModifySpender from './modify-spender'
import CreateSpender from './create-spender'

interface SettingsSpendersProps{
    setOpenTab : React.Dispatch<React.SetStateAction<"profile" | "categories" | "spenders" | "visualisation" | "none">>
    spenders : Spender[]
}

const SettingsSpenders = ({setOpenTab, spenders} : SettingsSpendersProps) => {
    console.log('spenders : ', spenders)
  return (
    <>
        <div className='fixed z-50 top-0 left-0 w-full py-4 bg-background h-24 px-6'>
            <Button onClick={() => setOpenTab('none')} variant={'ghost'} className='w-16 h-16 rounded-full'>
                <ArrowLeft/>
            </Button>
            <span className='absolute font-bold text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Personnes</span>
        </div>
        <div className='h-px w-full bg-accent mt-24'></div>
        <ul className='flex flex-col gap-2 grow pb-48 mt-8'>
            {
                spenders.map((spender, index) => (
                    <ModifySpender key={index} spender={spender}/>
                ))
            }
        </ul>
        <div className='fixed bottom-28 right-4 z-50'>
            <CreateSpender/>
        </div>
    </>
  )
}

export default SettingsSpenders
import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'

interface SettingsVisualisationProps{
    setOpenTab : React.Dispatch<React.SetStateAction<"profile" | "categories" | "spenders" | "visualisation" | "none">>
}

const SettingsVisualisation = ({setOpenTab} : SettingsVisualisationProps) => {
  return (
    <>
        <div className='relative w-full py-4 px-4'>
            <Button onClick={() => setOpenTab('none')} variant={'ghost'} className='w-16 h-16 rounded-full'>
                <ArrowLeft/>
            </Button>
            <span className='absolute font-bold text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Visualisation</span>
        </div>
        <div className='h-px w-full bg-accent'></div>
    </>
  )
}

export default SettingsVisualisation
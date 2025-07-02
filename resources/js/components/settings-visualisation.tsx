import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { ArrowLeft, BarChart, Palette, } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import ModifyChartsStyle from './modify-charts-style'
import { Preferences } from '@/types'
import ModifyChartsColor from './modify-charts-color'

interface SettingsVisualisationProps{
  setOpenTab : React.Dispatch<React.SetStateAction<"profile" | "categories" | "spenders" | "visualisation" | "none">>
  preferences : Preferences,
}

const SettingsVisualisation = ({setOpenTab, preferences} : SettingsVisualisationProps) => {  
    useEffect(() => {
      console.log('preferences ', preferences)
    }, [preferences])
    
  return (
    <>
        <div className='relative w-full py-4 px-4'>
            <Button onClick={() => setOpenTab('none')} variant={'ghost'} className='w-16 h-16 rounded-full'>
                <ArrowLeft/>
            </Button>
            <span className='absolute font-bold text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Visualisation</span>
        </div>
        <div className='h-px w-full bg-accent'></div>

        <h2 className='text-sm font-bold text-muted-foreground mt-8'>Graphiques</h2>
        <Card className='shadow-none border-none bg-white mt-2 py-4'>
          <CardContent className='flex items-center justify-between px-4'>
              <div className='flex items-center gap-2'>
                <Palette />
                <span className='flex-1 text-lg font-bold'>Couleur</span>
              </div>
              <ModifyChartsColor
                initialColor={preferences.charts_color}
              />
          </CardContent>
        </Card>
        <Card className='shadow-none border-none bg-white mt-2 py-4'>
          <CardContent className='flex items-start justify-between px-4'>
              <div className='flex items-center gap-2'>
                <BarChart />
                <span className='flex-1 text-lg font-bold h-12 flex items-center'>Style</span>
              </div>
              <ModifyChartsStyle
                  initialStyle = {preferences.charts_style}/>
          </CardContent>
        </Card>
    </>
  )
}

export default SettingsVisualisation
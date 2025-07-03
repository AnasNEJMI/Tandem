import React, { FormEvent, useCallback, useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { ArrowLeft, Pipette } from 'lucide-react';
import { colors } from '@/lib/data';
import { cn } from '@/lib/utils';

interface ColorPickerProps{
    className? : string,
    color : string,
    setColor : (color : string) => void;
}
const ColorPicker = ({color, setColor, className} : ColorPickerProps) => {
    const [open, setOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(color);
    
    const updateColorAndClose = useCallback(() => {
          setColor(selectedColor);
          setOpen(false);
    },[selectedColor])
    


  return (
    <Sheet open = {open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
            <Button style={{borderColor : color}} variant={'default'} className={cn('w-16 h-16 rounded-full border-4', className)}>
                <Pipette />
            </Button>
        </SheetTrigger>
        <SheetContent side='bottom' className='h-screen flex flex-col items-center'>
                <div className='grow flex overflow-y-auto flex-col max-w-xl w-full'>
                    <div className='p-6 flex items-center'>
                        <SheetClose asChild>
                            <Button type="button" variant="ghost" className='w-16 h-16 rounded-full'>
                                <ArrowLeft/>
                            </Button>
                        </SheetClose>
                    </div>
                    <SheetHeader className='flex items-center justify-center pt-8'>
                        <SheetTitle className='flex items-center justify-center flex-col'>
                            <Pipette className='w-12 h-12'/>
                            <span className='font-bold text-xl'>Couleurs</span>
                        </SheetTitle>
                        <SheetDescription>
                            Choisissez votre couleur
                        </SheetDescription>
                    </SheetHeader>
                    <div className='grow mt-8 grid grid-cols-6 gap-2 px-6 pb-16'>
                        {
                            colors.map((palette, index) => (
                                palette.map((c, index2) => (
                                    <div 
                                        onClick={() => setSelectedColor(`hsl(${c})`)}
                                        key={`color-${index}-${index2}`}
                                        style={{backgroundColor : `hsl(${c})`}}
                                        className={`${selectedColor === `hsl(${c})`? 'border-accent-foreground/75' : 'border-transparent'} border-8 aspect-square rounded-md`}></div>
                                ))
                            ))
                        }
                    </div>
                </div>
                <SheetFooter className='w-full max-w-xl'>
                    <Button disabled = {color === selectedColor} onClick={updateColorAndClose} variant={'default'} className='py-6 w-full'>
                        Confirmer
                    </Button>
                </SheetFooter>
        </SheetContent>
            
    </Sheet>
  )
}

export default ColorPicker
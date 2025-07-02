import React, { FormEvent, useCallback, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { ArrowLeft, BarChart, ChartColumnIncreasing, ChartLine, PenBox, Pencil } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { router, useForm } from '@inertiajs/react'

interface StyleDataForm{
  value : 'line'| 'bar',
  [k : string] : any,
}

interface ModifyChartsStyleProps{
    initialStyle : 'line' | 'bar',
}

const ModifyChartsStyle = ({initialStyle} : ModifyChartsStyleProps) => {
    const [open, setOpen] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState(initialStyle);
    const {data, setData, put,reset, processing, errors} = useForm<StyleDataForm>({
        value : selectedStyle,
    });

    const updateStyle = useCallback((style : 'line'|'bar') => {
        if(!style || selectedStyle === style) return;

        setData('value', style);
        setSelectedStyle(style);

        console.log('selected style : ', selectedStyle)
        console.log('data style : ', data.value)
    }, [selectedStyle])

    const handleStyleSubmit = (e : FormEvent) => {
        e.preventDefault();

        put('/settings/charts-style',{
            preserveScroll : true,
            preserveState:true,
            onSuccess :() => {
                reset();
                setOpen(false);
                router.reload({only:['preferences']});
            }
        })
    }

    const handleOpenChange = useCallback((open : boolean) => {
        setOpen(open);

        if(!open){
            setSelectedStyle(initialStyle);
            reset();
        }
    }, [initialStyle])

  return (
    <div className='flex items-center gap-2'>
        <div className=' border border-accent px-4 py-3 rounded-md bg-white flex items-center justify-center gap-2'>
            {
            selectedStyle === 'line' &&
            <>
                <span className='font-medium text-sm'>Linéaire</span>
                <ChartLine/>
            </>
            }
            {
            selectedStyle === 'bar' &&
            <>
                <span className='font-medium text-sm'>À Barres</span>
                <ChartColumnIncreasing/>
            </>
            }
        </div>
        <Dialog open ={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant='ghost' className='flex items-center justify-center h-12 w-12 rounded-full'>
                    <Pencil />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className='absolute top-0 left-0 pt-6 pl-6'>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost" className='w-12 h-12 rounded-full'>
                            <ArrowLeft/>
                        </Button>
                    </DialogClose>
                </div>
                <form onSubmit={handleStyleSubmit} className='mt-8'>
                    <DialogHeader>
                        <DialogTitle className='flex items-center justify-center flex-col'>
                            <BarChart className='w-12 h-12'/>
                            <span className='text-xl mt-2'>Modifier le style</span>
                        </DialogTitle>
                        <DialogDescription className='text-balance'>Sélectionner votre style des graphiques préféré, puis confirmer.</DialogDescription>

                    </DialogHeader>
                    <ToggleGroup value = {selectedStyle} onValueChange={updateStyle} type='single' className='flex gap-4 mt-8'>
                        <ToggleGroupItem value='line' className='flex-1 bg-white rounded-md flex items-center justify-center py-6 gap-2'>
                            <span className='font-medium text-sm'>Linéaire</span>
                            <ChartLine/>
                        </ToggleGroupItem>
                        <ToggleGroupItem value='bar' className='flex-1  bg-white rounded-md flex items-center justify-center py-6 gap-2'>
                            <span className='font-medium text-sm'>À Barres</span>
                            <ChartColumnIncreasing/>
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <DialogFooter className='flex flex-row mt-8'>
                        <Button type='submit' disabled = {selectedStyle === initialStyle} className='flex-1'>
                            Confirmer
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default ModifyChartsStyle
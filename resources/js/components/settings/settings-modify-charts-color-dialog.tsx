import React, { FormEvent, useCallback, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { ArrowLeft, BarChart, ChartColumnIncreasing, ChartLine, PenBox, Pencil } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { router, useForm } from '@inertiajs/react'
import ColorPicker from '../color-picker'

interface ColorDataForm{
  value : string,
  [k : string] : any,
}

interface ModifyChartsColorProps{
    initialColor : string,
}

const SettingsModifyChartsColorDialog = ({initialColor: initialColor} : ModifyChartsColorProps) => {
    const [open, setOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(initialColor);
    const {data, setData, put,reset, processing, errors} = useForm<ColorDataForm>({
        value : selectedColor,
    });

    const updateColor = useCallback((color:string) => {
        if(!color || selectedColor === color) return;

        setData('value', color);
        setSelectedColor(color);
    }, [selectedColor])

    const handleOpenChange = useCallback((open : boolean) => {
        setOpen(open);

        if(!open){
            setSelectedColor(initialColor);
            reset();
        }
    }, [initialColor])

    const handleColorSubmit = (e : FormEvent) => {
            e.preventDefault();
    
            put('/settings/charts-color',{
                preserveScroll : true,
                preserveState:true,
                onSuccess :() => {
                    reset();
                    setOpen(false);
                    router.reload({only:['preferences']});
                }
            })
        }

  return (
    <div className='flex items-center gap-2'>
        <div style={{backgroundColor : selectedColor}} className='w-12 h-12 rounded-md'></div>
        <Dialog open ={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant='ghost' className='flex items-center justify-center h-12 w-12 rounded-full'>
                    <Pencil/>
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
                <form onSubmit={handleColorSubmit} className='mt-8'>
                    <DialogHeader>
                        <DialogTitle className='flex items-center justify-center flex-col'>
                            <BarChart className='w-12 h-12'/>
                            <span className='text-xl mt-2'>Modifier la couleur des graphiques</span>
                        </DialogTitle>
                        <DialogDescription className='text-balance'>Sélectionner votre coulour de graphiques préférée, puis confirmer.</DialogDescription>

                    </DialogHeader>

                    <div className='flex gap-4 justify-center w-full mt-8'>
                        <div style={{backgroundColor : selectedColor}} className='w-24 h-12 rounded-md'></div>
                        <ColorPicker
                            color = {selectedColor}
                            setColor={updateColor}
                            className='w-12 h-12'/>
                    </div>
                    <DialogFooter className='flex flex-row mt-8'>
                        <Button type='submit' disabled = {selectedColor === initialColor} className='flex-1'>
                            Confirmer
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default SettingsModifyChartsColorDialog
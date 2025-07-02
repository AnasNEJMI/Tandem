import { router, useForm } from '@inertiajs/react';
import React, { FormEvent, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import DeleteSpender from './delete-spender';
import { ArrowLeft, ChevronDown, Pencil } from 'lucide-react';
import { Input } from './ui/input';
import InputError from './input-error';
import ColorPicker from './color-picker';
import { cn } from '@/lib/utils';
import { currencies } from '@/lib/data';
import { ToggleGroup } from './ui/toggle-group';
import { Toggle } from './ui/toggle';

interface ModifyCurrencyProps{
    className? : string,
    currency : string
}

interface UpdateSpenderDataForm{
    currency : string,
    [k : string] : any
}

const ModifyCurrency = ({currency, className} : ModifyCurrencyProps) => {
    const [open, setOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState(currency);
    const {data, setData,put,reset, errors} = useForm<UpdateSpenderDataForm>({
        currency : currency,
    });

    const handleModifySubmit = (e : FormEvent) => {
        e.preventDefault();

        put('/settings/currency',{
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
    <Dialog open = {open} onOpenChange={(open) => {reset(); setOpen(open);}}>
        <DialogTrigger asChild className={cn('', className)}>
            <Button variant='outline' className='relative p-4 w-40 shadow-sm bg-white flex items-center justify-center py-6 gap-12'>
                <span className='font-light'>{currencies.find((c) => c.code === currency)?.name}</span>
            </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col">
            <div className='absolute top-0 left-0 pt-6 pl-6'>
                <DialogClose asChild>
                    <Button type="button" variant="ghost" className='w-12 h-12'>
                        <ArrowLeft/>
                    </Button>
                </DialogClose>
            </div>
            <form onSubmit={handleModifySubmit} className='flex flex-col grow'>
                <div className='grow mt-8'>  
                    <DialogHeader>
                        <DialogTitle className='text-start flex items-center justify-center flex-col'>
                            <Pencil className='w-12 h-12' />
                            <span className='text-xl mt-2'>Modifer la devise</span>
                            <DialogDescription className='text-balance font-light text-sm'>
                                Choisissez la devise qui vous convient
                            </DialogDescription>
                        </DialogTitle>
                        <DialogDescription/>
                    </DialogHeader>
                </div>
                <ToggleGroup type='single' className='flex flex-wrap mt-8 gap-4'>
                    {
                        currencies.map((c, index) => (
                            <Toggle key={index} pressed={c.code === selectedCurrency} onPressedChange={()=> setSelectedCurrency(c.code)} className='text-nowrap border border-accent px-2 py-2'>{c.name}</Toggle>
                        ))
                    }
                </ToggleGroup>
                <DialogFooter className=" mt-8">
                    <Button disabled = {selectedCurrency === currency} type='submit' variant={'default'} className='flex-1 p-4'>
                        Confirmer
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default ModifyCurrency
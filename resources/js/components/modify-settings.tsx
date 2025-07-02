import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { ArrowLeft, Pencil } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { router, useForm } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface Option{
    value : string,
    label : string,
}

interface ModifySettingsProps{
    className? : string,
    initialOption : Option,
    options : Option[],
    postRoute : string,
    reloadOnlyArray : string[],
    title : string,
    description : string,
    disabled? : boolean,
}

interface ModifySettingsDataForm{
    value : string,
    [k : string] : any,
}
const ModifySettings = ({className, initialOption, options, postRoute,reloadOnlyArray, title, description, disabled} : ModifySettingsProps) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(initialOption.value);
    const {data, setData,put,reset, errors} = useForm<ModifySettingsDataForm>({
        value : initialOption.value,
    });

    const updatedSelectedOption = useCallback((value : string) => {
        if(!value || value === selectedValue) return;

        setData('value',value);
        setSelectedValue(value);
    }, [selectedValue]);

    const handleModifySubmit = (e : FormEvent) => {
        e.preventDefault();

        put(postRoute,{
            preserveScroll : true,
            preserveState:true,
            onSuccess :() => {
                reset();
                setOpen(false);
                router.reload({only:reloadOnlyArray});
            }
        })
    }

    const handleOpenChange = useCallback((open : boolean) => {
        setOpen(open);

        if(!open){
            setSelectedValue(initialOption.value);
            reset();
        }
    }, [initialOption])
    
  return (
    <Dialog open = {open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild className={cn('', className)}>
            <Button disabled = {disabled} variant='outline' className='relative p-4 w-40 shadow-sm bg-white flex items-center justify-center py-6 gap-12'>
                <span className='font-light'>{options.find((option) => option.value === initialOption.value)?.label}</span>
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
                            <span className='text-xl mt-2'>{title}</span>
                            <DialogDescription className='text-balance font-light text-sm'>
                                {description}
                            </DialogDescription>
                        </DialogTitle>
                        <DialogDescription/>
                    </DialogHeader>
                </div>
                <ToggleGroup type='single' value={selectedValue} onValueChange={updatedSelectedOption} className='flex justify-evenly flex-wrap mt-8 gap-2'>
                    {
                        options.map((option, index) => (
                            <ToggleGroupItem value={option.value} key={index} className='min-w-36 text-nowrap rounded-md border border-accent px-2 py-5'>{option.label}</ToggleGroupItem>
                        ))
                    }
                </ToggleGroup>
                <DialogFooter className=" mt-8">
                    <Button disabled = {selectedValue === initialOption.value} type='submit' variant={'default'} className='flex-1 p-4'>
                        Confirmer
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default ModifySettings
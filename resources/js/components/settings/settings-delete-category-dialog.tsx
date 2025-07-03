import React, { FormEvent, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import { Category } from '@/types'
import {router, useForm } from '@inertiajs/react'
import { cn } from '@/lib/utils'

interface DeleteCategoryProps{
    className?:string,
    category : Category
}
const SettingsDeleteCategoryDialog = ({category, className} : DeleteCategoryProps) => {
    const [open, setOpen] = useState(false);
    const {data,delete : destroy, processing, errors, reset} = useForm({
        'category_id' : category.id
    });
    const handleDeleteSubmit = (e : FormEvent) => {
        e.preventDefault();

        console.log("about to delete category : ", category, ' data is : ',data);
        destroy('settings/category', {
            preserveScroll : true,
            preserveState : true,
            onSuccess: () => {
                reset();
                setOpen(false);
                router.reload({only : ['categories']});
            }
        })
    }
  return (
    <Dialog open = {open}>
      <DialogTrigger  asChild>
        <Button className={cn('w-12 h-12 rounded-full transition-colors duration-150 ease-out', className)} onClick={() => setOpen(true)} variant={'ghost'}>
            <Trash/>
        </Button>
      </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <form onSubmit={handleDeleteSubmit}>
                <DialogHeader>
                <DialogTitle className='text-start flex flex-col w-full items-center gap-2'>
                    <Trash className='w-12 h-12'/>
                    <span>Supprimer la catégorie?</span>
                </DialogTitle>
                <DialogDescription className=' flex flex-col items-center justify-center'>
                    <span className='font-bold text-lg text-typography'>{category.name}</span>
                    <span className='text-start'>{category.transactions} transactions</span>
                </DialogDescription>
                </DialogHeader>
                <p className="flex items-center gap-2 text-center text-pretty text-sm">
                En supprimant cette catégorie, toutes les transactions qui lui sont associées seront supprimées également.
                </p>
                <DialogFooter className="sm:justify-start flex flex-row mt-8">
                    <Button type='submit' variant={'default'} className='flex-1'>
                        Confirmer
                    </Button>
                    <DialogClose asChild>
                        <Button onClick={() => setOpen(false)} type="button" variant="secondary" className='flex-1'>
                            Annuler
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default SettingsDeleteCategoryDialog
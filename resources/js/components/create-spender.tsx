import { colors } from '@/lib/data';
import { router, useForm } from '@inertiajs/react';
import React, { FormEvent, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { ArrowLeft, Plus, UsersIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import ColorPicker from './color-picker';

interface CreateSpenderProps{
    className? : string,
}

interface CreateSpenderDataForm{
    name : string,
    color : string,
    [k : string] : any,
}

const CreateSpender = ({className} : CreateSpenderProps) => {
    const [open, setOpen] = useState(false);
    const {data, setData, post, reset, processing, errors} = useForm<CreateSpenderDataForm>({
        name : '',
        color : colors[0][0],
    })

    const handleCreateSpenderSubmit = (e : FormEvent) => {
        e.preventDefault();

        post('/settings/spender',{
            preserveScroll : true,
            preserveState : true,
            onSuccess : () => {
                reset();
                setOpen(false);
                router.reload({only:['spenders']});
            }
        })
    }
  return (
    <Dialog open = {open} onOpenChange = {setOpen}>
        <DialogTrigger asChild>
            <Button variant = 'default' className ='w-18 h-18 rounded-md'>
                <Plus/>
            </Button>
        </DialogTrigger>
        <DialogContent className={cn('', className)}>
            <div className='absolute top-0 left-0 pt-6 pl-6'>
                <DialogClose asChild>
                    <Button type="button" variant="ghost" className='w-12 h-12'>
                        <ArrowLeft/>
                    </Button>
                </DialogClose>
            </div>
            <form onSubmit={handleCreateSpenderSubmit}>
                <DialogHeader>
                    <DialogTitle className='flex flex-col items-center justify-center mt-8'>
                        <UsersIcon className='w-12 h-12'/>
                        <span className='font-bold text-xl'>Ajouter une personne</span>
                    </DialogTitle>
                    <DialogDescription className='text-balance text-sm font-light'>
                        Donnez un nom et choisissez une couleur
                    </DialogDescription>
                </DialogHeader>
                <div className='mt-8'>
                    <span className='font-bold text-muted-foreground text-sm'>Nom </span>
                    <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className='text-xl font-bold h-14 mt-2'
                    />
                </div>
                <div className='mt-4'>
                    <span className='font-bold text-muted-foreground text-sm'>Couleur </span>
                    <div className='w-full flex gap-2'>
                        <div style={{backgroundColor : data.color}} className='flex-1 h-16 rounded-lg border-4 border-accent-foreground/50 '></div>
                        <ColorPicker color={data.color} setColor={(color) =>setData('color', color)}/>
                    </div>
                </div>
                <DialogFooter className='mt-8'>
                    <Button type='submit' className='py-6'>
                        Créer
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateSpender
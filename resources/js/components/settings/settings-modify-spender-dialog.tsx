import { Spender } from '@/types'
import { router, useForm } from '@inertiajs/react'
import React, { FormEvent, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { ArrowLeft, Pencil } from 'lucide-react'
import { Input } from '../ui/input'
import InputError from '../input-error'
import ColorPicker from '../color-picker'
import SettingsDeleteSpenderDialog from './settings-delete-spender-dialog'


interface ModifySpenderProps{
    spender : Spender
}

interface UpdateSpenderDataForm{
    id : number,
    name : string,
    color : string,
    [k : string] : any
}

const SettingsModifySpenderDialog = ({spender} : ModifySpenderProps) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(spender.name);
    const [color, setColor] = useState(spender.color);
    const {data, setData,put,reset, errors} = useForm<UpdateSpenderDataForm>({
        id : spender.id,
        name : spender.name,
        color : spender.color,
    });
    const handleModifySubmit = (e : FormEvent) => {
        e.preventDefault();

        put('/settings/spender',{
            preserveScroll : true,
            preserveState:true,
            onSuccess :() => {
                reset();
                setOpen(false);
                router.reload({only:['spenders']});
            }

        })
    }
  return (
    <Dialog open = {open} onOpenChange={(open) => {reset(); setOpen(open);}}>
        <div className='flex'>
            <DialogTrigger asChild className='h-20 w-full'>
                <Button variant='ghost' className='relative p-4 rounded-l-md rounded-r-none bg-white flex items-center justify-center gap-4'>
                    <div style={{backgroundColor : spender.color}} className='rounded-md w-12 h-12 border-4 border-typography/20'></div>
                    <div className='flex flex-col flex-1'>
                        <span className='font-bold text-lg text-typography'>{spender.name}</span>
                        <span className='text-sm font-light text-muted-foreground'>{spender.transactions} transactions</span>
                    </div>
                </Button>
            </DialogTrigger>
            <SettingsDeleteSpenderDialog className='rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none h-20 bg-white w-20' spender={spender}/>
        </div>
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
                            <span className='text-xl mt-2'>Modifer une personne</span>
                            <DialogDescription className='text-balance font-light text-sm'>
                                Changez le nom ou la une couleur
                            </DialogDescription>
                        </DialogTitle>
                        <DialogDescription/>
                    </DialogHeader>
                    <div className='mt-8'>
                        <span className='text-muted-foreground font-bold text-sm'>Nom</span>
                        <Input value={name} onChange={(e) => {setName(e.target.value); setData('name', e.target.value);}} className='h-14 mt-1 font-black'/>
                    </div>
                    {
                        errors.name && <InputError className='text-end mt-2' message='Veuillez saisir un nom correct.'/>
                    }
                    <div className='mt-4'>
                        <span className='text-muted-foreground font-bold text-sm'>Couleur</span>
                        <div className='w-full flex gap-2 mt-1'>
                            <div style={{backgroundColor : color}} className='flex-1 h-16 rounded-lg border-4 border-accent-foreground/50'></div>
                            <ColorPicker color={color} setColor={(color) =>{setColor(color); setData('color', color);}}/>
                        </div>
                    </div>
                </div>
                <DialogFooter className=" mt-8">
                    <Button disabled = {name === spender.name && color === spender.color} type='submit' variant={'default'} className='flex-1 p-4'>
                        Confirmer
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default SettingsModifySpenderDialog
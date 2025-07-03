import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { useForm } from '@inertiajs/react'

interface SettingsLogoutDialog{
    className?:string
}
const SettingsLogoutDialog = ({className}:SettingsLogoutDialog) => {
    const {delete : destroy} = useForm();

    const handleSubmit = () => {
        destroy('/logout',{
            preserveScroll : false,
            preserveState : false,
        });
    }
  return (
    <Dialog>
        <DialogTrigger asChild className={cn('', className)}>
            <Button variant={'destructive'} className='py-6 w-full text-base font-bold'>Déconnecter</Button>
        </DialogTrigger>
        <DialogContent className={cn('', className)}>
            <form onSubmit={handleSubmit}>
                <DialogHeader>
                    <DialogTitle className='flex flex-col items-center justify-center mt-8'>
                        <LogOut className='w-12 h-12'/>
                        <span className='font-bold text-xl'>Déconnexion</span>
                    </DialogTitle>
                    <DialogDescription className='text-balance text-sm font-light'>
                    </DialogDescription>
                </DialogHeader>
                <div className='text-sm text-center'>
                    Êtes-vous surs de vouloir vous déconnecter?
                </div>
                <DialogFooter className='mt-4 flex flex-row'>
                    <Button type='submit' className='py-6 flex-1'>
                        Confirmer
                    </Button>
                    <DialogClose asChild className='flex-1'>
                        <Button variant={'outline'} type='button' className='py-6'>
                            Annuler
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default SettingsLogoutDialog
import React, { FormEvent, useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../ui/dialog'
import { cn } from '@/lib/utils'
import { ArrowLeft, Plus, Shapes } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { router, useForm } from '@inertiajs/react'
import { colors } from '@/lib/data'
import ColorPicker from '../color-picker'

interface CreateCategoryProps{
    className? : string,
}

interface CreateCategoryDataForm{
    name : string,
    color : string,
    [k : string] : any,
}
const SettingsCreateCategoryDialog = ({className} : CreateCategoryProps) => {
    const [open, setOpen] = useState(false);
    const {data, setData, post, reset, processing, errors} = useForm<CreateCategoryDataForm>({
        name : '',
        color : colors[0][0],
    })

    const handleCreateCategorySubmit = (e : FormEvent) => {
        e.preventDefault();

        post('/settings/category',{
            preserveScroll : true,
            preserveState : true,
            onSuccess : () => {
                reset();
                setOpen(false);
                router.reload({only:['categories']});
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
            <form onSubmit={handleCreateCategorySubmit}>
                <DialogHeader>
                    <DialogTitle className='flex flex-col items-center justify-center mt-8'>
                        <Shapes className='w-12 h-12'/>
                        <span className='font-bold text-xl'>Créer une catégorie</span>
                    </DialogTitle>
                    <DialogDescription className='text-balance text-sm font-light'>
                        Ajouter une nouvelle catégorie en choisissant un nom et une couleur
                    </DialogDescription>
                </DialogHeader>
                <div className='mt-8'>
                    <span className='font-bold text-muted-foreground text-sm'>Intitulé </span>
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

export default SettingsCreateCategoryDialog
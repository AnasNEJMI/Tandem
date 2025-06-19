import React, { FormEvent, useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { ArrowLeft, Pencil} from 'lucide-react'
import { Category } from '@/types'
import CategoryIcon from './category-icon'
import DeleteCategory from './delete-category'
import { router, useForm } from '@inertiajs/react'
import { Input } from './ui/input'
import ColorPicker from './color-picker'
import InputError from './input-error'

interface ModifyCategoryProps{
    category : Category
}

interface UpdateCategoryDataForm{
    id : number,
    name : string,
    color : string,
    [k : string] : any
}
const ModifyCategory = ({category} : ModifyCategoryProps) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(category.name);
    const [color, setColor] = useState(category.color);
    const {data, setData,put,reset, errors} = useForm<UpdateCategoryDataForm>({
        id : category.id,
        name : category.name,
        color : category.color,
    });

    const handleModifySubmit = (e : FormEvent) => {
        e.preventDefault();

        put('/settings/category',{
            preserveScroll : true,
            preserveState:true,
            onSuccess :() => {
                reset();
                setOpen(false);
                router.reload({only:['categories'], onSuccess : () => {
                    setData('name', category.name);
                    setData('color', category.color);
                }});
            }

        })
        console.log('modifying : ', data)
    }

    
  return (
    <Dialog open = {open} onOpenChange={(open) => {reset(); setOpen(open);}}>
        <div className='flex'>
            <DialogTrigger asChild className='h-20 w-full'>
                <Button variant='ghost' className='relative p-4 rounded-l-md rounded-r-none bg-white flex items-center justify-center gap-4'>
                    <div className='rounded-full bg-accent/50 w-12 h-12 flex items-center justify-center'>
                        <CategoryIcon category={category.name} className='w-6 h-6'/>
                    </div>
                    <div className='flex flex-col flex-1'>
                        <span className='font-bold text-lg text-typography'>{category.name}</span>
                        <span className='text-sm font-light text-muted-foreground'>{category.transactions} transactions</span>
                    </div>
                </Button>
            </DialogTrigger>
            <DeleteCategory className='rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none h-20 bg-white w-20' category={category}/>
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
                            <span className='text-xl mt-2'>Modifer la catégorie</span>
                            <div className='flex gap-2 items-center justify-center'>
                                <span className='font-bold text-lg text-typography'>{category.name}</span>
                            </div>
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
                    <Button disabled = {data.name === category.name && data.color === category.color} type='submit' variant={'default'} className='flex-1 p-4'>
                        Confirmer
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default ModifyCategory
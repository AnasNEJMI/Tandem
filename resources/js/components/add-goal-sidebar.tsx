import React, { FormEvent, useEffect, useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { PlusIcon, SlidersVertical, XIcon } from 'lucide-react'
import { Select, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import { SelectContent, SelectItem } from './ui/select'
import { categories } from '@/lib/data'
import CategoryIcon from './category-icon'
import { useForm } from '@inertiajs/react'
import { Category, Spender } from '@/types'
import { Input } from './ui/input'
import InputError from './input-error'
import { ToggleGroup } from '@radix-ui/react-toggle-group'
import { Toggle } from './ui/toggle'

interface GoalData{
    category_id : number,
    spender_id : number,
    goal_integer : string,
    goal_decimal : string
    period : string,
    [k: string] : any,
}

interface AddGoalSidebarProps{
    className? : string,
    spenders : Spender[],
    categories : Category[],
}

const AddGoalSidebar = ({className, spenders, categories} : AddGoalSidebarProps) => {
    const [open, setOpen] = useState(false);
    const {data, setData, post, reset, processing, errors} = useForm<GoalData>({
        category_id : -1,
        spender_id : -1,
        goal_integer : '0',
        goal_decimal : '0',
        period : 'w'
    })

    const handleGoalSubmit = (e : FormEvent) =>  {
        e.preventDefault();

        console.log('data to submit', data);

        post('/goals', {
            preserveScroll : true,
            preserveState : true,
            only : ['goal_stats'],
            onSuccess:() => {
                reset();
                setOpen(false);
            },
            onError:()=>{
                console.log("errors", errors);
            }
        })
    }
  return (
    <Sheet open = {open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
            <Button className="w-18 h-18"><PlusIcon/></Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-screen overflow-y-auto rounded-t-3xl border-0 shadow-xl  px-6 pb-8">
            <form onSubmit={handleGoalSubmit} className='flex flex-col grow'>
                <SheetHeader className="sticky top-0 bg-background p-0 gap-0">
                    <div className="flex justify-between items-start pt-4 mt-2">
                        <div className='flex flex-col pt-2'>
                            <SheetTitle className="flex-1 text-start text-bold text-xl">Objectifs</SheetTitle>
                            <SheetDescription className="mt-1 text-xs text-pretty font-light">
                            Créer des objectifs budgetaires pour une meilleure gestion de vos finances.
                            </SheetDescription>
                        </div>
                    <SheetClose asChild>
                        <Button onClick={() => reset()} variant="ghost" className="w-12 h-12 rounded-full"><XIcon /></Button>
                    </SheetClose>
                    </div>
                    {/* <div className="h-px w-full bg-card-border"></div> */}
                </SheetHeader>
                <div className='h-px w-full bg-accent mt-8 mb-4'></div>
                <div className='grow flex flex-col'>
                    <div className='flex  gap-4'>
                        <div className='flex-1'>
                            <span className='text-muted-foreground font-bold text-sm'>Catégorie</span>
                            <Select onValueChange={(value) => setData('category_id', Number(value))}>
                                <SelectTrigger className= {`w-full h-16 flex items-center justify-center gap-2 font-medium text-sm p-4 rounded-xl bg-white shadow-xl mt-2 ${errors.category_id? "border-red-400 border-2" : ""}`}>
                                    {
                                        categories.find((category) => category.id === data.category_id) && 
                                        <CategoryIcon category={categories.find((category) => category.id === data.category_id)!.name}/>
                                    }
                                    <SelectValue className='' placeholder="..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        categories.map((category, index) => (
                                            <div key={index}  className='flex items-center justify-between p-1'>
                                                <CategoryIcon category={category.name}/>
                                                <SelectItem value={category.id.toString()}>{category.name}</SelectItem>
                                            </div>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            {
                                errors.category_id && <InputError className="text-pretty mt-4" message="Merci de préciser la catégorie."/>
                            }
                        </div>
                        <div className='flex-1'>
                            <span className='text-muted-foreground font-bold text-sm'>Personne</span>
                            <Select onValueChange={(value) => setData('spender_id', Number(value))}>
                                <SelectTrigger className= {`w-full h-16 flex items-center justify-center gap-2 font-medium text-sm p-4 rounded-xl bg-white shadow-xl mt-2 ${errors.spender_id? "border-red-400 border-2" : ""}`}>
                                    <SelectValue className='' placeholder="..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        spenders.map((spender, index) => (
                                            <SelectItem key={index} className ='flex items-center justify-between p-1' value={spender.id.toString()}>{spender.name}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            {
                                errors.spender_id && <InputError className="text-pretty mt-4" message="Merci de préciser la personne."/>
                            }
                        </div>
                    </div>
                    <div className='h-px w-full bg-accent mt-8 mb-4'></div>
                    <div className=" pb-0 w-full flex flex-col items-start gap-2">
                        <span className='text-muted-foreground font-bold text-sm'>Objectif budgetaire</span>
                        <div className="flex items-center justify-center gap-4 w-full">
                            <Input 
                                disabled = {processing}
                                type='number'
                                min={0}
                                max={999999}
                                value={data.goal_integer}
                                onChange={e => setData('goal_integer',e.target.value)}
                                onInput={e => {e.currentTarget.validity.valid||(e.currentTarget.value='');}}
                                className={`text-5xl md:text-5xl text-center font-bold tracking-tighter py-10 flex-4/6 ${errors.goal_integer? "border-red-400 border-2" : ""}`}/>
                            <span className="text-typography font-black text-xl"> , </span>
                            <Input
                                disabled = {processing}
                                type='number'
                                min={0}
                                value={data.goal_decimal}
                                onChange={e => setData('goal_decimal',e.target.value)}
                                max={99}
                                onInput={e => {e.currentTarget.validity.valid||(e.currentTarget.value='');}}
                                className={`text-5xl md:text-5xl text-center font-bold tracking-tighter py-10 flex-2/6 ${errors.goal_decimal? "border-red-400 border-2" : ""}`}/>
                            <span className="text-typography font-black text-xl"> €</span>
                            </div>
                            <div className="w-full">
                            {
                                (errors.goal_integer || errors.goal_integer) && <InputError className="text-pretty" message="Merci de soumettre un montant de dépense correct."/>
                            }
                            </div>
                        </div>

                        <div className='h-px w-full bg-accent mt-8 mb-4'></div>
                        <div>
                            <span className='text-muted-foreground font-bold text-sm'>Type d'objectif</span>
                            <ToggleGroup type='single' className='w-full h-16 flex gap-2 mt-2'>
                                <Toggle className={`flex-1 h-full font-bold border-2 text-typography ${data.period === 'w'? 'border-transparent' : 'border-accent text-muted-foreground'}`} pressed = {data.period === 'w'} onPressedChange={() => setData('period', 'w')}>Hibdomadaire</Toggle>
                                <Toggle className={`flex-1 h-full font-bold border-2 text-typography ${data.period === 'm'? 'border-transparent' : 'border-accent text-muted-foreground'}`} pressed = {data.period === 'm'} onPressedChange={() => setData('period', 'm')}>Mensuel</Toggle>
                                <Toggle className={`flex-1 h-full font-bold border-2 text-typography ${data.period === 'y'? 'border-transparent' : 'border-accent text-muted-foreground'}`} pressed = {data.period === 'y'} onPressedChange={() => setData('period', 'y')}>Annuel</Toggle>
                            </ToggleGroup>
                        </div>
                    
                    </div>
                <SheetFooter className='pb-0 px-0'>
                    <Button type="submit" className='h-16'>Enregistrer</Button>
                <SheetClose asChild>
                </SheetClose>
                </SheetFooter>
            </form>
        </SheetContent>
    </Sheet>
  )
}

export default AddGoalSidebar
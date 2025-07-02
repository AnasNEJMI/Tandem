"use client"

import * as React from "react"
import {motion} from 'motion/react';

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "./ui/input"
import { ExpenseDatePicker } from "./expense-date-picker"
import SpenderDropdown from "./spender-dropdown"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import { AnimatePresence } from "motion/react"
import { Textarea } from "./ui/textarea";
import { useForm } from "@inertiajs/react";
import { CategoryWithPlaces, Preferences, Spender } from "@/types";
import InputError from "./input-error";
import { PlusIcon } from "lucide-react";
import { currencySymbols } from "@/lib/data";

interface AddExpenseDrawerProps{
  categories : CategoryWithPlaces[],
  spenders : Spender[],
  preferences : Preferences,
  open : boolean,
  setOpen : React.Dispatch<React.SetStateAction<boolean>>
}


export function AddExpenseDrawer({categories, spenders, preferences, open, setOpen} : AddExpenseDrawerProps) {
  const {data, setData, post, processing, reset, errors} = useForm({
    amount : '',
    date : '',
    spender_id : -1,
    category_id : categories[0].id,
    place_ids : [] as number[],
    comment : '',
  })
  const [amountInteger, setAmountInteger] = React.useState<string>("0");
  const [amountDecimal, setAmountDecimal] = React.useState<string>("0");
  const [date, setDate] = React.useState<Date>();
  const [selectedSpenderId, setSelectedSpenderId] = React.useState<number>(-1);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number>(categories[0].id);
  const [selectedPlaceIds, setSelectedPlaceIds] = React.useState<number[]>([]);
  const [comment, setComment] = React.useState<string>('');

  const currencySymbol = currencySymbols[preferences.currency];

  const updateSelectedCategoryId = (categoryId : number) => {
    if(selectedCategoryId === categoryId) return; 
    setSelectedPlaceIds([]);
    setSelectedCategoryId(categoryId);
  }

  const updateSelectedPlaceIds = (placeId : number) =>{
    if(selectedPlaceIds.includes(placeId)){
      let filteredLocations = selectedPlaceIds.filter(location => location != placeId);
      setSelectedPlaceIds(filteredLocations)
    }else{
      let updatedSelectedLocations = [...selectedPlaceIds, placeId]
      setSelectedPlaceIds(updatedSelectedLocations);
    }
  }

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();

    post('/expenses', {
      only : ['expenses', 'stats'],
      onSuccess : () => {
        setAmountInteger('0');
        setAmountDecimal('0');
        setDate(undefined);
        setSelectedSpenderId(-1);
        setSelectedCategoryId(categories[0].id);
        setSelectedPlaceIds([]);
        setComment("");
        reset();
        setOpen(false);
      }
    })
  }




  React.useEffect(() => {
    setData('amount', amountInteger+"."+amountDecimal);
  }, [amountInteger, amountDecimal])
  
  React.useEffect(() => {
    if(date){
      setData('date', date.toISOString().slice(0,10));
    }
  }, [date])

  React.useEffect(() => {
    setData('spender_id', selectedSpenderId);
  }, [selectedSpenderId])

  React.useEffect(() => {
    setData('place_ids', selectedPlaceIds);
  }, [selectedPlaceIds])
  
  React.useEffect(() => {
    setData('category_id', selectedCategoryId);
  }, [selectedCategoryId])
  
  React.useEffect(() => {
    setData('comment', comment);
  }, [comment])


  
  return (
    <Drawer open = {open}  onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-18 h-18"><PlusIcon/></Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data" className="mx-auto w-full max-w-lg h-full relative px-6">
          <DrawerHeader className="mt-6">
            <DrawerTitle>Création d'une dépense</DrawerTitle>
            <DrawerDescription>Formulaire de dépense</DrawerDescription>
          </DrawerHeader>
          <div className="py-2 pb-0 w-full flex flex-col items-center gap-2">
            <div className="flex items-center justify-center gap-4 w-full">
              <Input 
                disabled = {processing}
                type='number'
                min={0}
                max={999999}
                value={amountInteger}
                onChange={e => setAmountInteger(e.target.value)}
                onInput={e => {e.currentTarget.validity.valid||(e.currentTarget.value='');}}
                className={`text-5xl md:text-5xl text-center font-bold tracking-tighter py-10 w-32 ${errors.amount? "border-red-400 border-2" : ""}`}/>
              <span className="text-typography font-black text-xl"> , </span>
              <Input
                disabled = {processing}
                type='number'
                min={0}
                value={amountDecimal}
                onChange={e => setAmountDecimal(e.target.value)}
                max={99}
                onInput={e => {e.currentTarget.validity.valid||(e.currentTarget.value='');}}
                className={`text-5xl md:text-5xl text-center font-bold tracking-tighter py-10 w-24 ${errors.amount? "border-red-400 border-2" : ""}`}/>
              <span className="text-typography font-black text-xl"> {currencySymbol}</span>
            </div>
            <div className="text-[0.70rem] text-muted-foreground">
              Montant de la dépense
            </div>
            <div className="w-full">
            {
              errors.amount && <InputError className="text-pretty" message="Merci de soumettre un montant de dépense correct."/>
            }
            </div>
          </div>
          <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
          <div className="flex items-center justify-center gap-6">
            <span className="text-sm text-typography flex-1">Date</span>
            <ExpenseDatePicker className="w-[240px]" error = {errors.date} date = {date} setDate = {setDate}/>
          </div>
          {
            errors.date && <InputError className="mt-2 text-pretty" message="Merci de soumettre une date correcte."/>
          }
          <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-typography">Qui a dépensé?</span>
            <SpenderDropdown error = {errors.spender_id} spenders = {spenders} spenderId={selectedSpenderId} setSpenderId={setSelectedSpenderId}/>
          </div>
          {
            errors.date && <InputError className="mt-2 text-pretty" message="Merci de sélectionner la personne qui réalise cette dépense."/>
          }
          <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
          <div className="relative">
            <span className="text-sm text-typography">Catégorie de dépense</span>
            <Carousel
              opts={{align : "start", loop : true}}
              className='w-full max-w-full mt-4 relative'
            >
              {/* <div className="absolute w-10 -right-2 h-full bg-gradient-to-l from-background to-transparent z-20"></div> */}
              {/* <div className="absolute w-10 -left-2 h-full bg-gradient-to-r from-background to-transparent z-20"></div> */}
              <CarouselContent className="relative z-10 font-medium overflow-visible">
                {
                  categories.map((category, index)=>(
                    <CarouselItem key={index} className="courses-input basis-1/3 rounded-md">
                      <div className='w-full rounded-md h-full flex items-center justify-center'>
                        <input disabled = {processing} type="radio" id={`expense-category-${index+1}`} name="categories" value={category.id} className="w-0 h-0 appearance-none" checked = {selectedCategoryId === category.id} onChange={(e) => updateSelectedCategoryId(Number(e.target.value))}/>
                        <label htmlFor={`expense-category-${index+1}`} className={`cursor-pointer rounded-md ${selectedCategoryId === category.id? "bg-primary text-primary-foreground" : "bg-transparent border border-card-border text-typography"} text-xs w-full h-full py-2 flex items-center justify-center text-center`}>{category.name}</label>
                      </div>
                    </CarouselItem>
                  ))
                }
              </CarouselContent>
            </Carousel>
            <AnimatePresence>
              {
                <motion.div
                  className="mt-2  flex flex-col"
                  key={`${selectedCategoryId}-places`}
                  initial = {{opacity:0, y:20}}
                  animate = {{opacity:1, y:0, transition :{delay : 0.15}}}
                  exit={{opacity:0, y:20}}
                  transition={{duration:0.15, ease:"easeOut"}}
                >
                  <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
                  <span className="text-start text-sm">Lieu</span>
                  <ul className="relative flex items-center justify-start gap-2 flex-wrap mt-2 scrollabe-element max-h-[150px]">
                    {
                      categories.find(category => category.id === selectedCategoryId)!.places.map((place, index) => {

                        return (
                        <li key={`${selectedCategoryId}-place-${place.name}`} className={`cursor-pointer rounded-md ${processing? "pointer-events-none" : ""} ${selectedPlaceIds.includes(place.id)? "bg-primary text-primary-foreground border-transparent" : "bg-transparent border-card-border text-typography"} border text-xs py-2 px-2 flex items-center justify-center`} onClick={() => updateSelectedPlaceIds(place.id)}>
                          {place.name}
                        </li>
                        )
                      })
                    }
                  </ul>
                </motion.div>
              }
              
            </AnimatePresence>
          </div>

          <div className="absolute left-0 px-6 bottom-0 w-full flex flex-col bg-background">
            <div className="h-px w-full bg-popover-border mb-2"></div>
            <span className="text-sm text-typography">Commentaire</span>
            <Textarea disabled = {processing} className="w-full mt-2 p-2 text-sm " value={comment} onChange={e => setComment(e.target.value)} placeholder="Des informations à ajouter?"/>
            <div className="h-px w-full bg-popover-border mt-2 mb-2"></div>

            <DrawerFooter className="flex gap-4 flex-row w-full">
              <Button type="submit" disabled = {processing} className="flex-1 py-6">
                {processing? "Enregistrer ..." : 'Enregistrer'}
              </Button>
              <DrawerClose className="flex-1 py-6" asChild>
                <Button variant="outline">Annuler</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  )
}

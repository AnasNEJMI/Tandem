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
import { Inertia, Method } from '@inertiajs/inertia';

const expenseCategories = ["Courses","Loyer","Électricité","Gaz","Voyage","Restaurant","Loisirs"];
const coursesLocations = ["E-Leclerc", "Lidl", "Marka Market", "Aldi", "Carrefour", "Marguerite", "Boulangerie", "H-Market", "Action", "Primark"];
const loisirsActivities = ["Sortie", "Restaurant", "Magasin", "Cinéma"];

export function AddExpenseDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const {data, setData, post, processing, reset, errors} = useForm({
    amount : '',
    date : '',
    spender : '',
    category : '',
    place : '',
    comment : '',
  })
  const [amountInteger, setAmountInteger] = React.useState<string>("0");
  const [amountDecimal, setAmountDecimal] = React.useState<string>("0");
  const [date, setDate] = React.useState<Date>();
  const [spender, setSpender] = React.useState<string>("Anas");
  const [category, setCategory] = React.useState<string>("Courses");
  const [selectedPlaces, setSelectedPlaces] = React.useState<string[]>([]);
  const [comment, setComment] = React.useState<string>('');

  const updateCategory = (selectedCategory : string) => {
    if(category === selectedCategory) return; 
    setSelectedPlaces([]);
    setCategory(selectedCategory);
  }

  const updateSelectedLocations = (selectedLocation : string) =>{
    if(selectedPlaces.includes(selectedLocation)){
      let filteredLocations = selectedPlaces.filter(location => location != selectedLocation);
      setSelectedPlaces(filteredLocations)
    }else{
      let updatedSelectedLocations = [...selectedPlaces, selectedLocation]
      setSelectedPlaces(updatedSelectedLocations);
    }
  }

  React.useEffect(() => {
    setData('amount', amountInteger+"."+amountDecimal);
    if(date){
      setData('date', date.toISOString().slice(0,10));
    }
    setData('spender', spender);
    setData('category', category);
    setData('place', selectedPlaces.join(', '));
    setData('comment', comment);

  }, [amountInteger, amountDecimal, category, selectedPlaces, date, spender, comment])
  
  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    post('/expenses', {
      only : ['expenses'],
      onSuccess : () => {
        setAmountInteger('0');
        setAmountDecimal('0');
        setDate(undefined);
        setSpender("Anas");
        setCategory("Courses");
        setSelectedPlaces([]);
        setComment("");
        reset();
      }
    })
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Ajouter</Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data" className="mx-auto w-full max-w-sm h-full relative px-6">
          <DrawerHeader className="mt-6">
            <DrawerTitle>Création d'une dépense</DrawerTitle>
            <DrawerDescription>Formulaire de dépense</DrawerDescription>
            <DrawerDescription>{JSON.stringify(errors)}</DrawerDescription>
          </DrawerHeader>
          <div className="py-4 pb-0 w-full flex flex-col items-center gap-2">
            <div className="flex items-center justify-center gap-4 w-full">
              <Input disabled = {processing} type='number' min={0} value={amountInteger} onChange={e => setAmountInteger(e.target.value)}  max={999999} onInput={e => {e.currentTarget.validity.valid||(e.currentTarget.value='');}} className="text-5xl text-center font-bold tracking-tighter py-10 w-32"/>
              <span className="text-typography font-black text-xl"> , </span>
              <Input disabled = {processing} type='number' min={0} value={amountDecimal} onChange={e => setAmountDecimal(e.target.value)} max={99} onInput={e => {e.currentTarget.validity.valid||(e.currentTarget.value='');}} className="text-5xl text-center font-bold tracking-tighter py-10 w-24"/>
              <span className="text-typography font-black text-xl"> €</span>
            </div>
            <div className="text-[0.70rem] text-typography">
              Montant de la dépense
            </div>
          </div>
          <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
          <div className="flex items-center justify-center gap-6">
            <span className="text-sm text-typography">Date</span>
            <ExpenseDatePicker date = {date} setDate = {setDate}/>
          </div>
          <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-typography">Qui a dépensé?</span>
            <SpenderDropdown spender={spender} setSpender={setSpender}/>
          </div>
          <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
          <div className="relative">
            <span className="text-sm text-typography">Catégorie de dépense</span>
            <Carousel
              opts={{align : "start", loop : true}}
              className='w-full max-w-full mt-4'
            >
              <CarouselContent className=" font-medium overflow-visible">
                {
                  expenseCategories.map((expenseType, index)=>(
                    <CarouselItem key={index} className="courses-input basis-1/4 rounded-md">
                      <div className='w-full rounded-md h-full flex items-center justify-center'>
                        <input disabled = {processing} type="radio" id={`expense-category-${index+1}`} name="categories" value={expenseType} className="w-0 h-0 appearance-none" checked = {category === expenseType} onChange={(e) => updateCategory(e.target.value)}/>
                        <label htmlFor={`expense-category-${index+1}`} className={`cursor-pointer rounded-md ${category === expenseType? "bg-primary text-primary-foreground" : "bg-transparent border border-card-border text-typography"} text-xs w-full h-full py-2 flex items-center justify-center`}>{expenseType}</label>
                      </div>
                    </CarouselItem>
                  ))
                }
              </CarouselContent>
            </Carousel>
            <AnimatePresence>
              {
                category === "Courses" &&
                <motion.div
                  className="mt-2"
                  key="courses-location-key"
                  initial = {{opacity:0, y:20}}
                  animate = {{opacity:1, y:0, transition :{delay : 0.15}}}
                  exit={{opacity:0, y:20}}
                  transition={{duration:0.15, ease:"easeOut"}}
                >
                  <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
                  <span className="text-start text-sm">Lieu</span>
                  <ul className="relative flex items-center justify-start gap-2 flex-wrap mt-2">
                    {
                      coursesLocations.map((courseLocation, index) => {

                        return (
                        <li key={courseLocation} className={`cursor-pointer rounded-md ${processing? "pointer-events-none" : ""} ${selectedPlaces.includes(courseLocation)? "bg-primary text-primary-foreground border-transparent" : "bg-transparent border-card-border text-typography"} border text-xs py-2 px-2 flex items-center justify-center`} onClick={() => updateSelectedLocations(courseLocation)}>
                          {courseLocation}
                        </li>
                        )
                      })
                    }
                  </ul>
                </motion.div>
              }

              {
                category === "Loisirs" &&
                <motion.div
                  className="mt-2"
                  key="loisirs-location-key"
                  initial = {{opacity:0, y:20}}
                  animate = {{opacity:1, y:0, transition :{delay : 0.15}}}
                  exit={{opacity:0, y:20}}
                  transition={{duration:0.15, ease:"easeOut"}}
                >
                  <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
                  <span className="text-start text-sm">Activité</span>
                  <ul className="relative flex items-center justify-start gap-2 flex-wrap mt-2">
                    {
                      loisirsActivities.map((loisirActivity, index) => {

                        return (
                        <li key={loisirActivity} className={`cursor-pointer rounded-md ${processing? "pointer-events-none" : ""} ${selectedPlaces.includes(loisirActivity)? "bg-primary text-primary-foreground border-transparent" : "bg-transparent border-card-border text-typography"} border text-xs py-2 px-2 flex items-center justify-center`} onClick={() => updateSelectedLocations(loisirActivity)}>
                          {loisirActivity}
                        </li>
                        )
                      })
                    }
                  </ul>
                </motion.div>
              }

              {
                category === "Restaurant" &&
                <motion.div
                  className="mt-2"
                  key="restaurant-location-key"
                  initial = {{opacity:0, y:20}}
                  animate = {{opacity:1, y:0, transition :{delay : 0.15}}}
                  exit={{opacity:0, y:20}}
                  transition={{duration:0.15, ease:"easeOut"}}
                >
                  <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
                  <span className="text-start text-sm">Lieu</span>
                  <Input disabled = {processing} className="text-xs" onChange={(e) => setSelectedPlaces([e.target.value])}/>
                </motion.div>
              }

              {
                category === "Voyage" &&
                <motion.div
                  className="mt-4"
                  key="trip-location-key"
                  initial = {{opacity:0, y:20}}
                  animate = {{opacity:1, y:0, transition :{delay : 0.15}}}
                  exit={{opacity:0, y:20}}
                  transition={{duration:0.15, ease:"easeOut"}}
                >
                  <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
                  <span className="text-start text-sm">Destination</span>
                  <Input disabled = {processing} className="text-xs mt-2" onChange={(e) => setSelectedPlaces([e.target.value])}/>
                </motion.div>
              }
            </AnimatePresence>
          </div>

          <div className="absolute left-0 px-6 bottom-0 w-full flex flex-col">
            <div className="h-px w-full bg-popover-border mt-2 mb-2"></div>
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

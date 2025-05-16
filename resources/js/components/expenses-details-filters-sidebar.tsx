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
import { SlidersVertical } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

const expenseCategories = ["Courses","Loyer","Électricité","Gaz","Voyage","Restaurant","Loisirs"];
const expenseSpenders = ["Anas", "Elham"];
const expenseOrderBys = ["Montant", "Date"];
const expenseOrderByDirection = ["Croissant", "Décroissant"];

const coursesLocations = ["E-Leclerc", "Lidl", "Marka Market", "Aldi", "Carrefour", "Marguerite", "Boulangerie", "H-Market", "Action", "Primark"];
const loisirsActivities = ["Sortie", "Restaurant", "Magasin", "Cinéma"];

export function ExpensesDetailsFiltersSidebar({
                                              categories,
                                              spenders,
                                              orderBy,
                                              orderByDirection,
                                              setCategories,
                                              setSpenders,
                                              setOrderBy,
                                              setOrderByDirection,}
                                          :{
                                            categories : string[],
                                            spenders : string[],
                                            orderBy : string,
                                            orderByDirection : string,
                                            setCategories : React.Dispatch<React.SetStateAction<string[]>>
                                            setSpenders : React.Dispatch<React.SetStateAction<string[]>>
                                            setOrderBy : React.Dispatch<React.SetStateAction<"Montant" | "Date">>
                                            setOrderByDirection : React.Dispatch<React.SetStateAction<"Croissant" | "Décroissant">>
                                          }) {

  const updateCategories = (selectedCategory : string) => {
    if(categories.includes(selectedCategory)){
      var filterCategories = categories.filter(category => category !== selectedCategory);
      setCategories(filterCategories)
    }else{
      setCategories([...categories, selectedCategory]);
    }
  }
  const updateSpenders = (selectedSpender : string) => {
    if(spenders.includes(selectedSpender)){
      var filteredSpenders = spenders.filter(spender => spender !== selectedSpender);
      setSpenders(filteredSpenders)
    }else{
      setSpenders([...spenders, selectedSpender]);
    }
  }

  const updateOrderBy = (selectedOrderBy : "Date"|"Montant") =>{
    if(orderBy === selectedOrderBy) return;
    setOrderBy(selectedOrderBy);
  }

  const updateOrderByDirection = (selectedOrderByDirection : "Croissant"|"Décroissant") =>{
    if(orderByDirection === selectedOrderByDirection) return;
    setOrderByDirection(selectedOrderByDirection);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="w-12 h-12 rounded-full">
          <SlidersVertical/>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6">
        <SheetHeader>
          <SheetTitle>Filtres</SheetTitle>
          <SheetDescription>
            Personnaliser votre sélection en choisissant vos filtres, puis en appuyant sur Confirmer.
          </SheetDescription>
        </SheetHeader>
        <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
        <div className="">
          <span className="text-sm font-bold">Catégories</span>
          <ul className="flex flex-col items-start gap-2 mt-2">
            {
              expenseCategories.map((category, index) => (
                <li key={index} className="flex items-center justify-center gap-2 text-typography">
                   <Checkbox
                      id={category}
                      checked={categories.includes(category)}
                      onCheckedChange={() => updateCategories(category)}
                    />
                    <Label htmlFor={category} className="capitalize">
                      {category}
                    </Label>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
        <span className="text-sm font-bold">Auteur/Autrice de la dépense</span>
        <ul className="flex flex-col items-start gap-2 mt-2">
          {
            expenseSpenders.map((spender, index) => (
              <li key={index} className="flex items-center justify-center gap-2 text-typography">
                <Checkbox
                  id={spender}
                  checked={spenders.includes(spender)}
                  onCheckedChange={() => updateSpenders(spender)}
                />
                <Label htmlFor={spender} className="capitalize">
                  {spender}
                </Label>
              </li>
            ))
          }
        </ul>
        <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
        <span className="text-sm font-bold">Ordonner par</span>
        <ul className="flex flex-col items-start gap-2 mt-2">
          {
            expenseOrderBys.map((ob, index) => (
              <li key={index} className="flex items-center justify-center gap-2 text-typography">
                <Checkbox
                  id={ob}
                  checked={orderBy === ob}
                  onCheckedChange={() => updateOrderBy(ob as "Date" | "Montant")}
                />
                <Label htmlFor={ob} className="capitalize">
                  {ob}
                </Label>
              </li>
            ))
          }
        </ul>
        <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
        <span className="text-sm font-bold">Ordonner par</span>
        <ul className="flex flex-col items-start gap-2 mt-2">
          {
            expenseOrderByDirection.map((obd, index) => (
              <li key={index} className="Ordre">
                <Checkbox
                  id={obd}
                  checked={orderByDirection === obd}
                  onCheckedChange={() => updateOrderByDirection(obd as "Croissant" | "Décroissant")}
                />
                <Label htmlFor={obd} className="capitalize">
                  {obd}
                </Label>
              </li>
            ))
          }
        </ul>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Enregistrer</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}

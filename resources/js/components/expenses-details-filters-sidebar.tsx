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
import { Category, Spender } from "@/types";

interface ExpenseDetailsFiltersProps{
  categories : Category[],
  spenders : Spender[],
  selectedCategories : Category[],
  selectedSpenders : Spender[],
  orderBy : string,
  orderByDirection : string,
  setSelectedCategories : React.Dispatch<React.SetStateAction<Category[]>>
  setSelectedSpenders : React.Dispatch<React.SetStateAction<Spender[]>>
  setOrderBy : React.Dispatch<React.SetStateAction<"Montant" | "Date">>
  setOrderByDirection : React.Dispatch<React.SetStateAction<"Croissant" | "Décroissant">>
                                          
}

// const expenseCategories = ["Courses","Loyer","Électricité","Gaz","Voyage","Restaurant","Loisirs"];
// const expenseSpenders = ["Anas", "Elham"];
const expenseOrderBys = ["Montant", "Date"];
const expenseOrderByDirection = ["Croissant", "Décroissant"];

// const coursesLocations = ["E-Leclerc", "Lidl", "Marka Market", "Aldi", "Carrefour", "Marguerite", "Boulangerie", "H-Market", "Action", "Primark"];
// const loisirsActivities = ["Sortie", "Restaurant", "Magasin", "Cinéma"];

export function ExpensesDetailsFiltersSidebar({
                                              categories,
                                              spenders,
                                              selectedCategories,
                                              selectedSpenders,
                                              orderBy,
                                              orderByDirection,
                                              setSelectedCategories: setCategories,
                                              setSelectedSpenders: setSpenders,
                                              setOrderBy,
                                              setOrderByDirection,}
                                          : ExpenseDetailsFiltersProps) {

  const updateCategories = (selectedCategory : string) => {
    if(selectedCategories.some((category) => category.name === selectedCategory)){
      var filterCategories = selectedCategories.filter(category => category.name !== selectedCategory);
      setCategories(filterCategories);
    }else{
      var newCategory = categories.find((category) => category.name === selectedCategory);
      if(newCategory !== undefined){
        setCategories([...selectedCategories, newCategory]);
      }
    }
  }
  const updateSpenders = (selectedSpender : string) => {
    if(selectedSpenders.some((spender) => spender.name ===selectedSpender)){
      var filteredSpenders = selectedSpenders.filter(spender => spender.name !== selectedSpender);
      setSpenders(filteredSpenders)
    }else{
      let newSpender = spenders.find((spender) => spender.name === selectedSpender);
      if(newSpender !== undefined){
        setSpenders([...selectedSpenders, newSpender]);
      }
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
              categories.map((category, index) => (
                <li key={index} className="flex items-center justify-center gap-2 text-typography">
                   <Checkbox
                      id={`filter-category-${category.id}`}
                      checked={selectedCategories.some((cat) => cat.id === category.id)}
                      onCheckedChange={() => updateCategories(category.name)}
                    />
                    <Label htmlFor={`filter-category-${category.id}`} className="capitalize">
                      {category.name}
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
            spenders.map((spender, index) => (
              <li key={index} className="flex items-center justify-center gap-2 text-typography">
                <Checkbox
                  id={`filter-spender-${spender.id}`}
                  checked={selectedSpenders.some((sp) => sp.id === spender.id)}
                  onCheckedChange={() => updateSpenders(spender.name)}
                />
                <Label htmlFor={`filter-spender-${spender.id}`} className="capitalize">
                  {spender.name}
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

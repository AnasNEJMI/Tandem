import * as React from "react"

import { Button } from "@/components/ui/button"
import { SlidersVertical, XIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Category, Spender } from "@/types";
import { ToggleGroup } from "../ui/toggle-group";
import { Toggle } from "../ui/toggle";
import { Separator } from "../ui/separator";

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

const expenseOrderBys = ["Montant", "Date"];
const expenseOrderByDirection = ["Croissant", "Décroissant"];

export function ExpensesDetailsFiltersSheet({
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
  
  const [selectAll, setselectAll] = React.useState(true);
                                        
  const updateCategories = (selectedCategory : string) => {
    if(selectedCategories.some((category) => category.name === selectedCategory)){
      var filterCategories = selectedCategories.filter(category => category.name !== selectedCategory);
      if(filterCategories.length != categories.length && selectAll){
        setselectAll(false);
      }
      if(filterCategories.length === categories.length && !selectAll){
        setselectAll(true);
      }
      setCategories(filterCategories);
    }else{
      var newCategory = categories.find((category) => category.name === selectedCategory);
      if(newCategory !== undefined){
        const newCategories = [...selectedCategories, newCategory];
        if(newCategories.length != categories.length && selectAll){
          setselectAll(false);
        }
        if(newCategories.length === categories.length && !selectAll){
          setselectAll(true);
        }
        setCategories(newCategories);
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

  const updateSelectAllFilter = (selectAll : boolean) => {
    setCategories(selectAll? [] : categories);
    setselectAll(!selectAll);
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="w-12 h-12 rounded-full">
          <SlidersVertical/>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-screen overflow-y-auto rounded-t-3xl border-0 shadow-xl pb-12 flex flex-col items-center">
        <SheetHeader className="sticky top-0 bg-background p-0 gap-0">
          <div className="flex justify-between items-center px-6 pt-4">
            <SheetTitle className="flex-1 text-start text-bold text-xl">Filtres</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" className="w-12 h-12 rounded-full"><XIcon /></Button>
            </SheetClose>
          </div>
          <SheetDescription className="px-6">
            Personnaliser votre sélection en choisissant vos filtres, puis en appuyant sur Confirmer.
          </SheetDescription>
        </SheetHeader>
        <div className="max-w-xl">
          <div className="px-6 mt-8">
            <div className="flex justify-between">
              <span className="text-sm font-bold">Catégories</span>
              <div className="flex gap-4">
                <Checkbox
                  id={`select-all-categories-id`}
                  checked={selectAll}
                  onCheckedChange={() => updateSelectAllFilter(selectAll)}
                />
                <Label htmlFor={`select-all-categories-id`} className={`${!selectAll? "" : "text-muted-foreground"} capitalize text-sm font-light`}>
                  Tout Sélectionner
                </Label>
              </div>
            </div>
            
            <ul className="flex flex-wrap justify-start gap-3 mt-6">
              {
                categories.map((category, index) => (
                  <li key={index} className="flex items-center justify-center gap-2 text-typography">
                      <Toggle
                        pressed = {selectedCategories.some((cat) => cat.id === category.id)}
                        onPressedChange={() => updateCategories(category.name)}
                        className="flex-1"
                        key={index}
                        >
                          {category.name}
                      </Toggle>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="h-px w-full bg-popover-border mt-4 mb-4 px-6"></div>
          <span className="text-sm font-bold px-6">Personnes</span>
          <div className="px-6">
            <ToggleGroup type="multiple" className="flex py-1 px-1 gap-1 rounded-xl border border-card-border">
            {
              spenders.map((spender, index) =>{
                  return <Toggle 
                            pressed = {selectedSpenders.some((sp) => sp.id === spender.id)}
                            onPressedChange={() => updateSpenders(spender.name)}
                            className="flex-1" key={index}>
                              {spender.name}
                          </Toggle>
              })
            }
            </ToggleGroup>
          </div>
          <div className="h-px w-full bg-popover-border mt-4 mb-4 px-6"></div>
          <span className="text-sm font-bold px-6">Ordonner par</span>
          <div className="px-6">
            <ToggleGroup type="single" className="flex py-1 px-1 gap-1 rounded-xl border border-card-border">
            {
              expenseOrderBys.map((ob, index) =>(
                <Toggle 
                  pressed = {orderBy === ob}
                  onPressedChange={() => updateOrderBy(ob as "Date" | "Montant")}
                  className="flex-1"
                  key={index}>
                    {ob}
                </Toggle>
              ))
            }
            </ToggleGroup>
          </div>
          <div className="h-px w-full bg-popover-border mt-4 mb-4 px-6"></div>
          <span className="text-sm font-bold px-6">Sens</span>
          <div className="px-6">
            <ToggleGroup type="single" className="flex py-1 px-1 gap-1 rounded-xl border border-card-border">
            {
              expenseOrderByDirection.map((obd, index) =>(
                <Toggle 
                  pressed = {orderByDirection === obd}
                  onPressedChange={() => updateOrderByDirection(obd as "Croissant" | "Décroissant")}
                  className="flex-1"
                  key={index}>
                    {obd}
                </Toggle>
              ))
            }
            </ToggleGroup>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

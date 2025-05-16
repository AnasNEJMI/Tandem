import React from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

const ParamsIconDropdownMenu =  ({showExpensesRecapCard, showExpensesRepartitionCard, showExpensesDetailsCard, setShowExpensesRecapCard, setShowExpensesRepartitionCard, setShowExpensesDetailsCard}
                            :{showExpensesRecapCard : boolean,
                              showExpensesRepartitionCard : boolean,
                              showExpensesDetailsCard : boolean,
                              setShowExpensesRecapCard : React.Dispatch<React.SetStateAction<boolean>>,
                              setShowExpensesRepartitionCard : React.Dispatch<React.SetStateAction<boolean>>,
                              setShowExpensesDetailsCard :React.Dispatch<React.SetStateAction<boolean>>})  => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='rounded-full h-12 w-12 flex items-center justify-center' size={"icon"} variant="ghost">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="16" cy="16" r="1"/>
                <circle cx="16" cy="24" r="1"/>
                <circle cx="16" cy="8" r="1"/>
            </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Personnaliser la page</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showExpensesRecapCard}
          onCheckedChange={setShowExpensesRecapCard}
        >
          Récap du mois
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showExpensesRepartitionCard}
          onCheckedChange={setShowExpensesRepartitionCard}
        >
          Répartion de dépenses
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showExpensesDetailsCard}
          onCheckedChange={setShowExpensesDetailsCard}
        >
          Détails des dépenses
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ParamsIconDropdownMenu
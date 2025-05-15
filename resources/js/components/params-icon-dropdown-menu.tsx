import React from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

const ParamsIconDropdownMenu = () => {
    const [showMonthRecap, setShowMonthRecap] = React.useState<Checked>(true)
    const [showDetails, setShowDetails] = React.useState<Checked>(false)
    const [showRepartition, setShowRepartition] = React.useState<Checked>(false)
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
          checked={showMonthRecap}
          onCheckedChange={setShowMonthRecap}
        >
          Récap du mois
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showRepartition}
          onCheckedChange={setShowRepartition}
        >
          Répartion de dépenses
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showDetails}
          onCheckedChange={setShowDetails}
        >
          Détails des dépenses
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ParamsIconDropdownMenu
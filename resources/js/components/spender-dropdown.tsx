import React from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

const SpenderDropdown = ({spender, setSpender} : {spender : string, setSpender : React.Dispatch<React.SetStateAction<string>>}) => {
    const [spenderIsAnas, setSpenderIsAnas] = React.useState<Checked>(false);
    const [spenderIsElham, setSpenderIsElham] = React.useState<Checked>(false);

    const setAnasAsSpender = () => {
        setSpender("Anas");
        setSpenderIsAnas(true);
        setSpenderIsElham(false);
    }

    const setElhamAsSpender = () => {
        setSpender("Elham");
        setSpenderIsElham(true);
        setSpenderIsAnas(false);
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='flex items-center justify-center min-w-32' variant="outline">
           {spender}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem
          checked={spenderIsAnas}
          onCheckedChange={setAnasAsSpender}
        >
          Anas
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={spenderIsElham}
          onCheckedChange={setElhamAsSpender}
        >
          Elham
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SpenderDropdown
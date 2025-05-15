import React from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

const SpenderDropdown = () => {
    const [spender, setSpender] = React.useState<string>("...");
    const [spenderIsAnas, setSpenderIsAnas] = React.useState<Checked>(false);
    const [spenderIsElham, setSpenderIsElham] = React.useState<Checked>(false);

    const setAnasAsSpender = () => {
        setSpenderIsAnas(true);
        setSpenderIsElham(false);
        setSpender("Anas");
    }

    const setElhamAsSpender = () => {
        setSpenderIsElham(true);
        setSpenderIsAnas(false);
        setSpender("Elham");
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
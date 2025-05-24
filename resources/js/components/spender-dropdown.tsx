import React from 'react'
import { Spender } from '@/types'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'


const SpenderDropdown = ({spenders, spenderId, setSpenderId, error} : {spenders : Spender[], spenderId : number, setSpenderId : (id : number) => void, error : string | undefined}) => {

  return (
        <Select onValueChange={(value) => setSpenderId(Number(value))}>
          <SelectTrigger className={`w-[180px] ${error? "border-red-400 border-2" : ""}`}>
            <SelectValue placeholder="..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Personnes</SelectLabel>
               {
                spenders.map((spender, index) => (
                  <SelectItem key={`spender${spender.id}`} value={spender.id.toString()}>{spender.name}</SelectItem>
                ))
               }
            </SelectGroup>
          </SelectContent>
        </Select>
  )
}

export default SpenderDropdown
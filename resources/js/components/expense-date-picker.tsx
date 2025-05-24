import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
export function ExpenseDatePicker({date, setDate, error} : {error : string | undefined, date: Date|undefined, setDate : React.Dispatch<React.SetStateAction<Date |undefined>>}) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `w-[calc(100%-48px)] justify-center text-left font-normal ${error? "border-red-400 border-2" : ""}`,
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {date ? date.toLocaleDateString("fr", { dateStyle: "full" })
                        .replace(/./, c => c.toUpperCase())
                        .replace(/,? /, ", ") : <span>Sélectionner une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 pointer-events-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          required
        />
      </PopoverContent>
    </Popover>
  )
}
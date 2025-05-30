import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { fr } from "date-fns/locale"

interface ExpenseDatePickerProps{
  date : Date | undefined,
  setDate : React.Dispatch<React.SetStateAction<Date |undefined>>,
  error : string | undefined,
  className? : string
}
 
export function ExpenseDatePicker({date, setDate, error, className} : ExpenseDatePickerProps) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `max-w-[calc(100%-48px)] bg-white border-0 h-10 shadow-lg justify-center text-left font-normal ${error? "border-red-400 border-2" : ""}`,
            !date && "text-muted-foreground", className
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
          locale={fr}
        />
      </PopoverContent>
    </Popover>
  )
}
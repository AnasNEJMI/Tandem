import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const months = [
  { label: "Janvier", value: "0" },
  { label: "Février", value: "1" },
  { label: "Mars", value: "2" },
  { label: "Avril", value: "3" },
  { label: "Mai", value: "4" },
  { label: "Juin", value: "5" },
  { label: "Juillet", value: "6" },
  { label: "Août", value: "7" },
  { label: "Septembre", value: "8" },
  { label: "Octobre", value: "9" },
  { label: "Novembre", value: "10" },
  { label: "Décembre", value: "11" },
]

const years = Array.from({ length: 21 }, (_, i) => 2015 + i)

const ExpensesMonthYearSelect = ({date, onChange, className} : {date: Date, onChange: (newDate: Date) => void, className?: string}) => {
    
    const handleMonthChange = (month : string) => {
        let newDate = new Date(date);
        newDate.setMonth(Number(month));
        onChange(newDate);
    }
    const handleYearChange = (year : string) => {
        let newDate = new Date(date);
        newDate.setFullYear(Number(year));
        onChange(newDate);
    }
  
    return (
    <div className={cn("flex gap-4 sticky px-4 py-2 w-full flex-center justify-center", className)}>
        <Select value={date.getMonth().toString()} onValueChange={handleMonthChange}>
          <SelectTrigger className='w-[130px] font-bold flex justify-between px-4 text-typography/70'>
            <SelectValue placeholder="Mois" className='grow'/>
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>  
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={date.getFullYear().toString()} onValueChange={handleYearChange}>
          <SelectTrigger className='w-[130px] font-bold flex justify-between px-4 text-typography/70'>
            <SelectValue placeholder="Année" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
    </div>
  )
}

export default ExpensesMonthYearSelect
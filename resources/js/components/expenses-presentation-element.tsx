import { Expense, Preferences } from '@/types';
import useCalculateAndFormatAmount from '@/hooks/useCalculateAndFormatAmount';
import useCurrencySymbol from '@/hooks/use-currency-symbol';

interface ExpensePresentationProps{
    expenses : Expense[],
    preferences : Preferences

}

const ExpensesPresentationElement = ({expenses, preferences} : ExpensePresentationProps) => {
    const totalAmount = useCalculateAndFormatAmount(expenses, preferences.number_format);
    const currencySymbol = useCurrencySymbol(preferences.currency)
  return (
    <div className='w-full flex flex-col items-center mt-10'>
        <div>
            <span className='font-black text-4xl'>{totalAmount}</span>
            <span className='font-black text-4xl'> {currencySymbol}</span>
        </div>
        <span className='text-muted-foreground font-light text-xs'>Total Dépensé</span>
    </div>
  )
}

export default ExpensesPresentationElement
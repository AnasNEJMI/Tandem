import { formatAmount, numberFormats } from '@/lib/data';
import { Expense } from '@/types'
import React, { useMemo } from 'react'



const useCalculateAndFormatAmount = (expenses : Expense[], format : string) => {
  return  useMemo(() =>{
              let total = expenses.reduce((acc, cur) => Number(acc) + Number(cur.amount), 0.00);
              return formatAmount(total, format);
          }, [expenses, format])
}

export default useCalculateAndFormatAmount
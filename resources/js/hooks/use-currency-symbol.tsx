import { currencySymbols } from '@/lib/data';
import React, { useMemo } from 'react'

const useCurrencySymbol = (currency : string) => {
  return useMemo(() =>{
            const symbol = currencySymbols[currency];
            if(!symbol){
                console.error('unknow currency', symbol);
                return '?'
            }

            return symbol;
        }, [currency])
}

export default useCurrencySymbol
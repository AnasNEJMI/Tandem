import React, { createContext, useContext, useState } from 'react'

interface ExpensesContextProps{
  isDrawerOpen : boolean;
  setIsDrawerOpen : (isOpen : boolean) => void;

}

const ExpensesContext = createContext<ExpensesContextProps | undefined>(undefined);

const ExpensesContextProvider = ({children} : {children : React.ReactNode}) => {
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const updateIsDrawerOpen = (isOpen : boolean) => setIsDrawerOpen(isOpen);
  return (
    <ExpensesContext.Provider value={{isDrawerOpen : isDrawerOpen, setIsDrawerOpen : updateIsDrawerOpen}}>
      {children}
    </ExpensesContext.Provider>
  )
}

export const useExpensesContext = () => {
  const context = useContext(ExpensesContext);
  if(!context) throw new Error("useExpensesContext must be used within ExpensesContextProvider");
  return context;
}

export default ExpensesContextProvider
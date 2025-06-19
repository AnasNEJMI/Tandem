import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft, Delete, Plus, Trash } from 'lucide-react'
import { Category } from '@/types'
import CategoryIcon from './category-icon'
import DeleteCategory from './delete-category'
import ModifyCategory from './modify-category'
import CreateCategory from './create-category'

interface SettingsCategoriesProps{
    setOpenTab : React.Dispatch<React.SetStateAction<"profile" | "categories" | "spenders" | "visualisation" | "none">>
    categories : Category[],
}

const SettingsCategories = ({setOpenTab, categories} : SettingsCategoriesProps) => {
  return (
    <>
        <div className='fixed z-50 top-0 left-0 w-full py-4 bg-background h-24 px-6'>
            <Button onClick={() => setOpenTab('none')} variant={'ghost'} className='w-16 h-16 rounded-full'>
                <ArrowLeft/>
            </Button>
            <span className='absolute font-bold text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Catégories</span>
        </div>
        <div className='h-px w-full bg-accent mt-24'></div>
        <ul className='flex flex-col gap-2 grow pb-48 mt-8'>
            {
                categories.map((category, index) => (
                    <ModifyCategory key={index} category={category}/>
                ))
            }
        </ul>
        <div className='fixed bottom-28 right-4 z-50'>
            <CreateCategory/>
        </div>
    </>
  )
}

export default SettingsCategories
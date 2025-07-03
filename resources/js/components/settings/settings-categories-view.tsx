import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Category } from '@/types'
import SettingsModifyCategoryDialog from './settings-modify-category-dialog'
import SettingsCreateCategoryDialog from './settings-create-category-dialog'
import { useMediaQuery } from '@/hooks/use-media-query'

interface SettingsCategoriesProps{
    setOpenTab : React.Dispatch<React.SetStateAction<"profile" | "categories" | "spenders" | "visualisation" | "none">>
    categories : Category[],
}

const SettingsCategoriesView = ({setOpenTab, categories} : SettingsCategoriesProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")                           
    return (
    <div className='max-w-xl w-full'>
        <div className='sticky z-50 top-0 max-w-xl  py-4 bg-background h-24'>
            <Button onClick={() => setOpenTab('none')} variant={'ghost'} className='w-16 h-16 rounded-full'>
                <ArrowLeft/>
            </Button>
            <span className='absolute font-bold text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Catégories</span>
        </div>
        <div className='h-px w-full bg-accent'></div>
        <ul className='flex flex-col gap-2 grow pb-48 mt-8'>
            {
                categories.map((category, index) => (
                    <SettingsModifyCategoryDialog key={index} category={category}/>
                ))
            }
        </ul>
        <div className={`fixed ${isDesktop? 'bottom-16 right-16' :'bottom-28 right-4' }  z-50`}>
            <SettingsCreateCategoryDialog/>
        </div>
    </div>
  )
}

export default SettingsCategoriesView
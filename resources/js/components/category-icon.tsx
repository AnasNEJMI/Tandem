import { categories } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ActivityIcon, AirplayIcon, BabyIcon, BackpackIcon, BanknoteIcon, BusFrontIcon, CarIcon, CatIcon, CircleHelpIcon, CookingPotIcon, FootprintsIcon, FuelIcon, GiftIcon, GraduationCapIcon, HandCoins, HandHeartIcon, HouseIcon, PlaneIcon, Plug2Icon, ShirtIcon, ShoppingCartIcon, SmartphoneIcon, UtensilsIcon, WifiIcon, WindIcon } from 'lucide-react';
import React from 'react'

const CategoryIcon = ({category, className} : {category : string, className? : string}) => {
  switch(category){
      case categories[0] :
          return <ShoppingCartIcon className = {cn('', className)}/>;
      case categories[1] :
          return <HouseIcon className = {cn('', className)}/>;
      case categories[2] :
          return <Plug2Icon className = {cn('', className)}/>;
      case categories[3] :
          return <WindIcon className = {cn('', className)}/>;
      case categories[4] :
          return <WifiIcon className = {cn('', className)}/>;
      case categories[5] :
          return <SmartphoneIcon className = {cn('', className)}/>;
      case categories[6] :
          return <FuelIcon className = {cn('', className)}/>;
      case categories[7] :
          return <UtensilsIcon className = {cn('', className)}/>;
      case categories[8] :
          return <BusFrontIcon className = {cn('', className)}/>;
      case categories[9] :
          return <BanknoteIcon className = {cn('', className)}/>;
      case categories[10] :
          return <BabyIcon className = {cn('', className)}/>;
      case categories[11] :
          return <GraduationCapIcon className = {cn('', className)}/>;
      case categories[12] :
          return <CookingPotIcon className = {cn('', className)}/>;
      case categories[13] :
          return <ShirtIcon className = {cn('', className)}/>;
      case categories[14] :
          return <FootprintsIcon className = {cn('', className)}/>;
      case categories[15] :
          return <AirplayIcon className = {cn('', className)}/>;
      case categories[16] :
          return <HandHeartIcon className = {cn('', className)}/>;
      case categories[17] :
          return <PlaneIcon className = {cn('', className)}/>;
      case categories[18] :
          return <GiftIcon className = {cn('', className)}/>;
      case categories[19] :
          return <ActivityIcon className = {cn('', className)}/>;
      case categories[20] :
          return <CarIcon className = {cn('', className)}/>;
      case categories[21] :
          return <HandCoins className = {cn('', className)}/>;
      case categories[22] :
          return <CatIcon className = {cn('', className)}/>;
      case categories[23] :
          return <HouseIcon className = {cn('', className)}/>;
      case categories[24] :
          return <CircleHelpIcon className = {cn('', className)}/>;
      default : 
        return <CircleHelpIcon className = {cn('', className)}/>;
    }
}

export default CategoryIcon
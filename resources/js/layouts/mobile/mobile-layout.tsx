import React, {} from 'react';
import MobileNav from '@/components/mobile-nav';
import { cn } from '@/lib/utils';

const MobileLayout = ({children, className}
                            :{children : React.ReactNode, className? : string}) => {

    return (
    <div className= {cn('relative min-h-[100svh] flex flex-col', className)}>
        {children}
        <MobileNav/>
    </div>
  )
}

export default MobileLayout
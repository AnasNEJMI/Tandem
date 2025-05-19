import React, {} from 'react';
import MobileNav from '@/components/mobile-nav';

const MobileLayout = ({children}
                            :{children : React.ReactNode}) => {

    return (
    <div className='relative min-h-[100svh] flex flex-col'>
        {children}
        <MobileNav/>
    </div>
  )
}

export default MobileLayout
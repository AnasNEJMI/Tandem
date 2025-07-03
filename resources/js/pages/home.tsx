import { Button } from '@/components/ui/button'
import { Head, Link } from '@inertiajs/react'
import { WalletMinimal } from 'lucide-react'
import React from 'react'

const Home = () => {
  return (
    <>
        <Head title="Home">
            <link rel="preconnect" href="https://fonts.bunny.net" />
            <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        </Head>
        <div className='relative h-[100svh] flex flex-col'>
            <div className='grid grid-rows-4 p-8 h-full w-full justify-center items-center'>
                <div className='flex row-end-3 items-start justify-center flex-col'>
                    <h1 className='text-5xl font-medium text-typography'>tandem</h1>
                    <h2 className='text-balance font-medium text-typography/75 text-lg mt-2'>Votre guide de dépenses. Pensé pour vous, quelques soient vos besoins.</h2>
                </div>
            </div>
            <div className='absolute bottom-6 p-6 flex flex-col items-center w-full'>
                <Link href='/login' className='grow mt-2'>
                    <Button className='w-60 rounded-full h-16 text-lg'>Connectez-vous</Button>
                </Link>
                <div className='flex items-center justify-center gap-4 mt-8'>
                    <span className='text-base text-muted-foreground font-light'>Pas de compte?</span>
                    <Link href='/register' className='grow'>
                        <Button variant={'outline'} className='px-8 h-10 border border-card-border'>Créez en un</Button>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home
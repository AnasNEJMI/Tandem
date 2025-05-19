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
            <div className='grid grid-rows-3 p-6 h-full w-full justify-center items-center'>
                <div className='flex items-center justify-center flex-col'>
                    <WalletMinimal className='w-24 h-24'/>
                    <h1 className='capitalise text-3xl font-bold'>Tandem</h1>
                    <h2 className='text-balance text-muted-foreground text-center text-sm mt-6'>Pensée pour deux.<br/> Créée pour votre sérénité.</h2>
                </div>
            </div>
            <div className='absolute bottom-6 right-0 p-6 flex flex-col items-start'>
                <span className='text-sm text-muted-foreground'>Vous avez déjà un compte?</span>
                <Link href='/login' className='grow mt-2'>
                    <Button className='w-48 h-10'>Conectez-vous</Button>
                </Link>
                <span className='text-sm text-muted-foreground mt-6'>Vous n'avez pas de compte?</span>
                <Link href='/register' className='grow mt-2'>
                    <Button variant={'outline'} className='w-48 h-10 border border-card-border'>Créez en un</Button>
                </Link>
            </div>
        </div>
    </>
  )
}

export default Home
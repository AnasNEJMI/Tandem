import SetupUpMobileLayout from '@/layouts/mobile/setup-mobile-layout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Setup = () => {
  return (
    <>
        <Head title="Setup">
            <link rel="preconnect" href="https://fonts.bunny.net" />
            <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        </Head>
        <SetupUpMobileLayout>
            setup
        </SetupUpMobileLayout>
    </>
  )
}

export default Setup
import { Category, Expense, Preferences, Spender, type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import StatsMobileLayout from '@/layouts/mobile/stats-mobile-layout';
import SettingsMobileLayout from '@/layouts/mobile/settings-mobile-layout';
import { Card, CardContent } from '@/components/ui/card';
import { ChartLine, PersonStanding, ShapesIcon, UserIcon, UsersIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Logout from '@/components/logout';

interface SettingsProps{
    categories : Category[],
    spenders : Spender[],
    preferences : Preferences,
}

export default function Settings({categories, spenders, preferences} : SettingsProps) {
    const [openTab, setOpenTab] = useState<'profile'|'categories'|'spenders'|'visualisation'|'none'>('none');
    const { auth } = usePage<SharedData>().props;
    
    return (
        <>
            <Head title="Settings">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <SettingsMobileLayout
                openTab = {openTab}
                setOpenTab = {setOpenTab}
                categories = {categories}
                spenders = {spenders}
                preferences={preferences}
            
            >
                <Card onClick={() => setOpenTab('profile')} className='p-4 bg-white hover:bg-white/50 cursor-pointer duration-150 transition-all ease-out mt-4'>
                    <CardContent className='flex items-center justify-center gap-4'>
                        <UserIcon className='w-8 h-8'/>
                        <p className='flex flex-col w-full'>
                            <span className='font-bold text-lg'>Préférences</span>
                            <span className='text-[0.7rem] font-light text-muted-foreground'>Personnaliser vos préférences.</span>
                        </p>
                    </CardContent>
                </Card>
                <Card onClick={() => setOpenTab('categories')} className='p-4 bg-white hover:bg-white/50 cursor-pointer duration-150 transition-all ease-out mt-4'>
                    <CardContent className='flex items-center justify-center gap-4'>
                        <ShapesIcon className='w-8 h-8'/>
                        <p className='flex flex-col w-full'>
                            <span className='font-bold text-lg'>Catégories</span>
                            <span className='text-[0.7rem] font-light text-muted-foreground'>Ajouter, modifier, supprimer une catégorie.</span>
                        </p>
                    </CardContent>
                </Card>
                <Card onClick={() => setOpenTab('spenders')} className='p-4 bg-white hover:bg-white/50 cursor-pointer duration-150 transition-all ease-out mt-4'>
                    <CardContent className='flex items-center justify-center gap-4'>
                        <UsersIcon className='w-8 h-8'/>
                        <p className='flex flex-col w-full'>
                            <span className='font-bold text-lg'>Personnes</span>
                            <span className='text-[0.7rem] font-light text-muted-foreground'>Ajouter, modifier, supprimer une personne.</span>
                        </p>
                    </CardContent>
                </Card>
                <Card onClick={() => setOpenTab('visualisation')} className='p-4 bg-white hover:bg-white/50 cursor-pointer duration-150 transition-all ease-out mt-4'>
                    <CardContent className='flex items-center justify-center gap-4'>
                        <ChartLine className='w-8 h-8'/>
                        <p className='flex flex-col w-full'>
                            <span className='font-bold text-lg'>Visualisation des données</span>
                            <span className='text-[0.7rem] font-light text-muted-foreground'>Personnaliser vos visuels.</span>
                        </p>
                    </CardContent>
                </Card>

                <Logout className = 'mt-8'/>

            </SettingsMobileLayout>
        </>
    );
}

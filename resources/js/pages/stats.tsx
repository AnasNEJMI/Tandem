
import { Category, ChartStats, MonthStats, Preferences, Spender, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import StatsLayout from '@/layouts/mobile/stats-layout';
import { useEffect } from 'react';
import StatsMonthlySpendingSection from '@/components/stats/stats-monthly-spending-section';
import StatsSpendingEvolutionSection from '@/components/stats/stats-spending-evolution-section';

interface StatsProps{
    spenders : Spender[],
    categories : Category[],
    month_stats : MonthStats[];
    evolution_stats : ChartStats,
    preferences : Preferences,
}

export default function Stats({month_stats, evolution_stats, spenders, categories, preferences} : StatsProps) {
    const { auth } = usePage<SharedData>().props;
    
    useEffect(() => {
    //   console.log(expenses);
    //   console.log("general_stats : ", general_stats);
    //   console.log("per_spender_stats : ", per_spender_stats);
    //   console.log("month_stats : ", month_stats);
    //   console.log("spenders : ", spenders);
    //   console.log("categories : ", categories);
    }, [])
    
    return (
        <>
            <Head title="Stats">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=''/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap" rel="stylesheet"></link>
            </Head>
            <StatsLayout  className='flex flex-col lg:flex-row gap-8 lg:items-start lg:justify-start mt-8'>
                <StatsMonthlySpendingSection className='flex-1' preferences={preferences} stats = {month_stats}/>
                <StatsSpendingEvolutionSection preferences={preferences} spenders={spenders} categories={categories} stats={evolution_stats} className='flex-1'/>
            </StatsLayout>
        </>
    );
}

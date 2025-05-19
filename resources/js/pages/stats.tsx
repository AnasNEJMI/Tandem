import { Expense, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import StatsMobileLayout from '@/layouts/mobile/stats-mobile-layout';

interface StatsProps{
    expenses : Expense[];
}

export default function Stats({expenses} : StatsProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Stats">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <StatsMobileLayout>
                stats
            </StatsMobileLayout>
        </>
    );
}

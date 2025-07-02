import { Category, Expense, GoalStats, Preferences, Spender, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import GoalsMobileLayout from '@/layouts/mobile/goals-mobile-layout';
import GoalsTabs from '@/components/goals-tabs';

interface GoalsProps{
    goal_stats : GoalStats[],
    categories : Category[],
    spenders : Spender[],
    preferences : Preferences
}

export default function Goals({categories, spenders, goal_stats, preferences} : GoalsProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Stats">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <GoalsMobileLayout categories={categories} spenders={spenders}>
                <GoalsTabs preferences={preferences} className='pb-16' goalStats={goal_stats}/>
            </GoalsMobileLayout>
        </>
    );
}

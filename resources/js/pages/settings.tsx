import { Expense, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import StatsMobileLayout from '@/layouts/mobile/stats-mobile-layout';
import SettingsMobileLayout from '@/layouts/mobile/settings-mobile-layout';

interface SettingsProps{
    expenses : Expense[];
}

export default function Settings({expenses} : SettingsProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Settings">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <SettingsMobileLayout>
                Settings
            </SettingsMobileLayout>
        </>
    );
}

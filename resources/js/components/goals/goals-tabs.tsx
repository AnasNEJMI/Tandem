import React, { useMemo, useState } from 'react'
import { GoalStats, Preferences } from '@/types'
import { Card, CardContent, CardTitle } from '../ui/card';
import GoalsLastSixSection from './goals-last-six-section';
import { CircleXIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoalTabsProps{
    className? : string,
    goalStats : GoalStats[],
    preferences : Preferences
}

const GoalsTabs = ({className, goalStats, preferences} : GoalTabsProps) => {
    const [tab, setTab] = useState<'w'|'m'|'y'>('w');
    const selectedGoals = useMemo(() => {
        return goalStats.length > 0? goalStats.filter((goal) => goal.period === tab) : [];
    }, [tab])

    const {success, fail} = useMemo(()=>{
        let success = 0;
        let fail = 0
        if(selectedGoals.length > 0){
            selectedGoals.forEach(goal => {
                success += goal.stats.filter((stat) => stat.amount <= goal.goal).length;
                fail += goal.stats.filter((stat) => stat.amount > goal.goal).length;
            });
        }

        return {success, fail};
    }, [selectedGoals]);

    const lastSixPeriods = (period : 'w'|'m'|'y') => {
        switch(period){
            case 'w' : return '6 dernières semaines';
            case 'm' : return '6 dernièrs mois';
            case 'y' : return '6 dernières années';
            default : return '';
        }
    }

     const periodAdjective = (period : 'w'|'m'|'y') => {
        switch(period){
            case 'w' : return 'hibdomadaire';
            case 'm' : return 'mensuel';
            case 'y' : return 'annuel';
            default : return '';
        }
    }
    
  return (
    <div className={cn('w-full ', className)}>
        <span className='text-muted-foreground font-bold text-sm'>Vos objectifs budgétaires</span>
        <ul className='w-full flex items-center justify-center gap-2 mt-4 rounded-md p-2 border border-accent'>
            <li onClick={() => setTab('w')} className={`${tab === 'w'? 'bg-white shadow-md text-typography cursor-default hover:bg-white pointer-events-none':'bg-background shadow-none text-muted-foreground cursor-pointer hover:bg-white/65 hover:text-typography/65'} flex-1 text-center py-4 px-2 text-sm font-semibold border border-accent rounded-md transition-all duration-150 ease-out`}>Hibdomadaires</li>
            <li onClick={() => setTab('m')} className={`${tab === 'm'? 'bg-white shadow-md text-typography cursor-default hover:bg-white pointer-events-none':'bg-background shadow-none text-muted-foreground cursor-pointer hover:bg-white/65 hover:text-typography/65'} flex-1 text-center py-4 px-2 text-sm font-semibold border border-accent rounded-md transition-all duration-150 ease-out`}>Mensuels</li>
            <li onClick={() => setTab('y')} className={`${tab === 'y'? 'bg-white shadow-md text-typography cursor-default hover:bg-white pointer-events-none':'bg-background shadow-none text-muted-foreground cursor-pointer hover:bg-white/65 hover:text-typography/65'} flex-1 text-center py-4 px-2 text-sm font-semibold border border-accent rounded-md transition-all duration-150 ease-out`}>Annuels</li>
        </ul>
        {
            selectedGoals.length === 0 &&
            <div className='w-full h-40 border border-accent rounded-md flex items-center justify-center mt-8 text-muted-foreground text-sm gap-2'>
                <CircleXIcon/>
                <span>Aucun objectif {periodAdjective(tab)} n'a été créé.</span>
            </div>
        }
        <div className='flex flex-col lg:flex-row gap-8'>
            {
                selectedGoals.length > 0 && 
                <Card className='mt-4 bg-white flex-1 h-min'>
                    <CardContent>
                        <CardTitle className='text-sm'>Récapitulatif</CardTitle>
                        <div className='mt-4 flex justify-between'>
                            <div className='flex flex-col items-center'>
                                <p className='h-20 w-20 p-4 flex flex-col items-center justify-center border border-accent rounded-full'>
                                    <span className='font-bold text-lg  '>{selectedGoals.length}</span>
                                    <span className='font-light text-sm'>objectif</span>
                                </p>
                                <span className='text-light text-xs  mt-2 bg-typography/50 text-white rounded-sm px-2 py-px'>Total </span>
                            </div>
                            <div className='flex flex-col items-center px-2'>
                                <div className='flex justify-end gap-4'>
                                    <p className='h-20 w-20 p-4 flex flex-col items-center justify-center border border-green-700 rounded-full'>
                                        <span className='font-bold text-lg text-green-700'>{success}</span>
                                        <span className='font-light text-sm text-green-700'>Réussite</span>
                                    </p>
                                    <p className='h-20 w-20 p-4 flex flex-col items-center justify-center border border-red-700 rounded-full'>
                                        <span className='font-bold text-lg text-red-700'>{fail}</span>
                                        <span className='font-light text-sm text-red-700'>Echec</span>
                                    </p>    
                                </div>
                                <span className='text-light text-xs bg-typography/50 text-white rounded-sm px-2 py-px mt-2 w-full text-center'>{lastSixPeriods(tab)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            }

            {
                tab === 'w' && selectedGoals.length > 0 &&
                <GoalsLastSixSection preferences={preferences} className='mt-4 bg-white flex-1' period={'w'} goalStats={selectedGoals}/>
            }
            {
                tab === 'm' && selectedGoals.length > 0 &&
                <GoalsLastSixSection preferences={preferences} className='mt-4 bg-white flex-1' period={'m'} goalStats={selectedGoals}/>
            }
            {
                tab === 'y' && selectedGoals.length > 0 &&
                <GoalsLastSixSection preferences={preferences} className='mt-4 bg-white flex-1' period={'y'} goalStats={selectedGoals}/>
            }
        </div>
            
    </div>
  )
}

export default GoalsTabs
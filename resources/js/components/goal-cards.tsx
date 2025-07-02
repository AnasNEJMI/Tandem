import { cn } from '@/lib/utils'
import { GoalStats, Preferences } from '@/types';
import React, { useMemo, useState } from 'react'
import { Card, CardContent, CardTitle } from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import {XCircleIcon } from 'lucide-react';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { stat } from 'fs';
import { formatAmount, formatDate } from '@/lib/data';
import useCurrencySymbol from '@/hooks/use-currency-symbol';

interface GoalCards{
    className? : string,
    period : 'w'|'m'|'y',
    goalStats : GoalStats[],
    preferences : Preferences
}


const GoalCards = ({className, period, goalStats, preferences} : GoalCards) => {
    const [goalIndex, setGoalIndex] = useState(0);
    const currencySymbol = useCurrencySymbol(preferences.currency);
    const cardHeader = (period : 'w'|'m'|'y') => {
        switch(period){
            case 'w' : return 'Objectifs Hibdomadaires';
            case 'm' : return 'Objectifs Mensuels';
            case 'y' : return 'Objectifs Annuels';
            default : return 'Objectifs';
        }
    }

    const periodToNoun = (date : string, period : 'w'|'m'|'y') => {
        const dateObjs = date.split('-');
        const month = dateObjs[0];
        const day = dateObjs[1];
        const year = dateObjs[2];
        switch(period){
            case 'w' : return day+'/'+month;
            case 'm' : return month+'/'+year.slice(2,4);
            case 'y' : return year;
        }
    }

    const currentPeriod = (period : 'w'|'m'|'y') => {
        switch(period){
            case 'w' : return 'Semaine Actuelle';
            case 'm' : return 'Mois Actuel';
            case 'y' : return 'Année actuelle';
            default : return '';
        }
    }

    const chartStats = useMemo(() => {
        if(goalStats.length === 0) return {
            data : [],
            config : {},
            current : {exceeds : false, amount : 0, goal : 0, pct : 0}
        };
        
        const config : {[k:string]: {label : string, color : string}} = {};
        let data : {period : string, max : string, excess : string}[] = [];
        const selectedStat = goalStats[goalIndex];
        const goal = selectedStat.goal;

        const sortedStats = [...selectedStat.stats].sort((a, b) => {
            const dateA = new Date(a.startDate);
            const dateB = new Date(b.startDate);
            return dateA.getTime() - dateB.getTime();
        });

        data = sortedStats.map((stat, index) => {
            return {
                period : periodToNoun(stat.endDate, selectedStat.period),
                max : Number(Math.min(goal, stat.amount)).toFixed(2),
                excess : Number(Math.max(0, stat.amount-goal)).toFixed(2),
            }

        })

        config['max'] = {
            label : 'Objectif',
            color : goalStats[goalIndex].spender.color,
        }

        config['excess'] = {
            label : 'Dépassé',
            color : 'hsl(0 72.2% 50.6%)',
        }

        const pct = Number(sortedStats[sortedStats.length - 1].amount) > Number(goal)? 
            Number((goal/sortedStats[sortedStats.length - 1].amount)*100).toFixed(0) : 
            Number((sortedStats[sortedStats.length - 1].amount/goal)*100).toFixed(0)
            const current = {
                exceeds : Number(sortedStats[sortedStats.length - 1].amount) > Number(goal),
                amount : sortedStats[sortedStats.length - 1].amount,
                goal : goal,
                pct : pct,
            }

            return {
                data : data,
                config : config satisfies ChartConfig,
                current : current,
            }
        }, [goalStats, goalIndex])

    const formatCreatedAtDate = (date : string) => {
        const dateString =  new Intl.DateTimeFormat('fr-FR').format(new Date(date));
        const [day, month, year] = dateString.split('/');
        switch(preferences.date_format){
            case 'mdy' : 
                return `${month}/${day}/${year}`
            case 'dmy' : 
                return `${day}/${month}/${year}`
                default : 
                console.error('unknown date format ', preferences.date_format);
                return `${day}/${month}/${year}`
        }
    }
  return (
    <Card className={cn('mt-2', className)}>
        <CardContent className='w-full min-h-40'>
            <CardTitle className='text-sm'>Évolution Des {cardHeader(period)}</CardTitle>
            <div className='flex mt-4 gap-4 items-center'>
            <span className='text-xs text-nowrap text-typography font-bold'>Objectif</span>
            <DropdownMenu>
                <DropdownMenuTrigger className=' bg-white shadow-md rounded-md w-full flex flex-col'>
                    <div style={{backgroundColor : goalStats[goalIndex].spender.color}} className='w-full py-1 text-xs rounded-t-md flex justify-between px-2 text-white'><span className='flex w-min font-bold'>{goalStats[goalIndex].spender.name}</span> <span className='font-light'>Créé le : <span>{formatCreatedAtDate(goalStats[goalIndex].created_at)}</span></span></div>
                    <div className='flex w-full py-1 px-2'>
                        <span className='text-sm flex-1 font-bold text-typography'>{formatAmount(Number(goalStats[goalIndex].goal), preferences.number_format)} {currencySymbol}</span>
                        <div className='h-4 w-px bg-accent'></div>
                        <span className='text-sm flex-1 font-bold text-typography'>{goalStats[goalIndex].category.name}</span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='min-w-80'>
                    <DropdownMenuLabel>{cardHeader(period)}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={goalIndex.toString()} onValueChange={(e) => setGoalIndex(Number(e))}>
                    {
                        goalStats.map((stat, index) => (
                            <DropdownMenuRadioItem color={stat.spender.color} className='hover:bg-background w-full' key={`${stat.period}-${index}`} value={index.toString()}>
                                <p className='flex flex-col flex-1 text-xs text-muted-foreground'>Objectif<span className='text-sm font-bold text-typography'>{formatAmount(Number(goalStats[index].goal), preferences.number_format)} {currencySymbol}</span></p>
                                <div className='h-12 w-px bg-accent'></div>
                                <p className='flex flex-col flex-1 text-xs text-muted-foreground'>Catégorie<span className='text-sm font-bold text-typography'>{goalStats[index].category.name}</span></p>
                                <div className='h-12 w-px bg-accent'></div>
                                <p className='flex flex-col flex-1 text-xs text-muted-foreground'>Personne<span className='text-sm font-bold text-typography'>{goalStats[index].spender.name}</span></p>
                            </DropdownMenuRadioItem>
                        ))
                    }
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            </div> 
            <ChartContainer config={chartStats.config} className='pt-8 h-[200px] w-full'>
                <BarChart accessibilityLayer data={chartStats.data} className='relative' margin={{left : -48}}>
                    <XAxis
                    dataKey="period"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value}
                    />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="max" barSize={'25'} stackId={'a'} fill={goalStats[goalIndex].spender.color} radius={8} />
                    <Bar dataKey="excess" barSize={'25'} stackId={'a'} fill='hsl(0 84.2% 60.2%)' radius={8} />
                    <CartesianGrid strokeWidth={2} strokeDasharray={5} vertical={false} horizontal={true} opacity={100} horizontalValues={[goalStats[goalIndex].goal]} className='stroke-red-500'/>
                    <YAxis
                        domain={[0, Math.max(goalStats[goalIndex].goal, 0) * 2]}
                        axisLine = {false} 
                        tickLine = {false}
                        ticks={[0,goalStats[goalIndex].goal]}
                        tickFormatter={(value) => ""} fontWeight={700}/>
                </BarChart>
            </ChartContainer>
            <div>
                <div className='flex justify-between items-end mt-8'>
                    <span className='text-typography pb-2 font-bold text-xs text-start pr-4'>{currentPeriod(period)}</span>
                    {
                        chartStats.current.exceeds && 
                        <svg viewBox='0 0 100 30' className='overflow-visible max-w-60 pr-4'>
                            {/* <rect rx={2} y={15} x={0} height={10} width={chartStats.current.pct} fill='blue'></rect> */}
                            {/* <rect y={15} x={chartStats.current.pct} height={10} width={100 - Number(chartStats.current.pct)} fill='red'></rect> */}
                            <line rx= {2} x1={chartStats.current.pct} y1={10} x2={chartStats.current.pct} y2={30} strokeDasharray={2} strokeWidth={0.5}  stroke='black'></line>
                            <line rx= {2} x1={100} y1={10} x2={100} y2={30} strokeDasharray={2} strokeWidth={0.5}  stroke='black'></line>
                            <text fontFamily='roboto' fontWeight={300} fontSize={5} y={8} x={Number(chartStats.current.pct) - 8} >Objectif</text>
                            <text fontFamily='roboto' fontWeight={300} fontSize={5} y={4} x={100 - 8} >Mantant</text>
                            <text fontFamily='roboto' fontWeight={300} fontSize={5} y={8} x={100 - 8} >dépensé</text>
                            <path d= {`M5 15 L${chartStats.current.pct} 15 L${chartStats.current.pct} 25 L5 25 Q-1 20 5 15 z5 15`} stroke='none' className='fill-sky-500'/>
                            <path d= {`M${chartStats.current.pct} 15 L97 15 Q102 20 97 25 L${chartStats.current.pct} 25 z${chartStats.current.pct} 25`} stroke='none' className='fill-red-500/50'/>
                        </svg>
                    }
                    {
                        !chartStats.current.exceeds && 
                        <svg viewBox='0 0 100 30' className='overflow-visible max-w-60 pr-4'>
                            {/* <rect rx={2} y={15} x={0} height={10} width={chartStats.current.pct} fill='blue'></rect> */}
                            {/* <rect y={15} x={chartStats.current.pct} height={10} width={100 - Number(chartStats.current.pct)} fill='red'></rect> */}
                            <line rx= {2} x1={chartStats.current.pct} y1={10} x2={chartStats.current.pct} y2={30} strokeDasharray={2} strokeWidth={0.5}  stroke='black'></line>
                            <line rx= {2} x1={100} y1={10} x2={100} y2={30} strokeDasharray={2} strokeWidth={0.5}  stroke='black'></line>
                            <text fontFamily='roboto' fontWeight={300} fontSize={5} y={8} x={100-8} >Objectif</text>
                            <text fontFamily='roboto' fontWeight={300} fontSize={5} y={4} x={Number(chartStats.current.pct) - 8} >Mantant</text>
                            <text fontFamily='roboto' fontWeight={300} fontSize={5} y={8} x={Number(chartStats.current.pct) - 8} >dépensé</text>
                            <path d= {`M5 15 L${chartStats.current.pct} 15 L${chartStats.current.pct} 25 L5 25 Q-1 20 5 15 z5 15`} stroke='none' className='fill-sky-500'/>
                            <path d= {`M${chartStats.current.pct} 15 L97 15 Q102 20 97 25 L${chartStats.current.pct} 25 z${chartStats.current.pct} 25`} stroke='none' className='fill-zinc-300/20'/>
                        </svg>
                    }
                </div>
                {
                    chartStats.current.exceeds &&
                    <div className='bg-red-400/30 text-red-500 flex gap-4 p-2 rounded-md mt-4'>
                        <XCircleIcon className=''/>
                        <span className='font-bold text-xs text-pretty'>Vous avez dépassé votre objectif de {formatAmount(Number(chartStats.current.amount - chartStats.current.goal), preferences.number_format)} {currencySymbol}, soit {Number((chartStats.current.amount/chartStats.current.goal)*100).toFixed(2)} % du budget fixé.</span>
                    </div>
                }
                {
                    !chartStats.current.exceeds &&
                    <div className='bg-green-500/30 text-green-700 flex gap-4 p-2 rounded-md mt-4'>
                        <XCircleIcon className=''/>
                        <span className='font-bold text-xs text-pretty'>Votre objectif est actuellement atteint, vous avez encore : {formatAmount(Number(chartStats.current.goal - chartStats.current.amount), preferences.number_format)} {currencySymbol} à dépenser avant de dépasser votre objectif.</span>
                    </div>
                }
            </div>
        </CardContent>
    </Card>
  )
}

export default GoalCards
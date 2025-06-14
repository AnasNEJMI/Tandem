import React, { useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { SpendingEvolutionPerCategoryStats } from '@/types'
import { useForm } from '@inertiajs/react'

interface SpendingEvolutionPerCategoryProps{
    stats : SpendingEvolutionPerCategoryStats,
}
const GenralSpendingEvolution = ({stats} : SpendingEvolutionPerCategoryProps) => {
    const {data, setData, post, processing, errors} = useForm();
    useEffect(() => {
      console.log("stats are", stats)
    }, [stats])

    const trendingData = useMemo(() => {
        const previousMonthAmount = stats.data[stats.data.length -2].amount;
        const previousPreviousMonthAmount = stats.data[stats.data.length -3].amount;

        let pct = 0;
        let trend = "down";
        if(previousMonthAmount > previousPreviousMonthAmount){
            trend = "up";
            pct = (previousMonthAmount - previousPreviousMonthAmount)/previousPreviousMonthAmount;
            pct = pct*100;
        }else{
            trend = "down";
            pct = (previousPreviousMonthAmount - previousMonthAmount)/previousPreviousMonthAmount;
            pct = pct*100;
        }

        return {trend : trend, pourcentage : pct.toFixed(2)};
    }, [stats])
    
    return (
    <>
        {/* <pre>{JSON.stringify(stats, null, 2)}</pre> */}
        <span className='text-sm text-muted-foreground font-bold'>Évolution des dépenses par mois</span>
        <Card className='rounded-md p-4 bg-white shadow-lg mt-2 '>
            <CardContent className='pl-0'>
                {
                    !processing && stats.data && stats.config &&
                    <ChartContainer config={stats.config}>
                        <AreaChart
                            accessibilityLayer
                            data={stats.data}
                        >
                            <CartesianGrid vertical={false} />
                            <YAxis
                                tickLine = {false}
                                axisLine = {false}
                                tickMargin={8}
                                tickFormatter={(value) => `${value} €`}
                            />
                            <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => value.split(' ')[0]}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                offset="5%"
                                stopColor="var(--color-desktop)"
                                stopOpacity={0.8}
                                />
                                <stop
                                offset="95%"
                                stopColor="var(--color-desktop)"
                                stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                offset="5%"
                                stopColor="var(--color-mobile)"
                                stopOpacity={0.8}
                                />
                                <stop
                                offset="95%"
                                stopColor="var(--color-mobile)"
                                stopOpacity={0.1}
                                />
                            </linearGradient>
                            </defs>
                            <Area
                            dataKey="amount"
                            type="natural"
                            fill="url(#fillMobile)"
                            fillOpacity={0.4}
                            stroke="var(--color-mobile)"
                            stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                }
                {
                    processing &&
                    <div className='ml-3 bg-background animate-pulse w-full h-48 rounded-lg mb-4'></div>
                }
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                    <div className=" font-medium leading-none">
                    Le mois dernier vous avez dépensé {trendingData.pourcentage} % de {trendingData.trend === "up"? "plus" : "moins"} que le mois d'avant {trendingData.trend === "up"? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />} 
                    </div>
                    <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    {stats.data[0].month.split(' ')[0]} - {stats.data[stats.data.length - 1].month}
                    </div>
                </div>
                </div>
            </CardFooter>
        </Card>
    </>
  )
}

export default GenralSpendingEvolution
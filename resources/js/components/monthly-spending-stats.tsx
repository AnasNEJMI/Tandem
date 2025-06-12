import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Card, CardContent } from './ui/card'
import { ToggleGroup } from './ui/toggle-group'
import { Toggle } from './ui/toggle'
import {CircleXIcon, TrendingDown, TrendingUp, UserIcon } from 'lucide-react'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { Label, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, RadialBar, RadialBarChart } from 'recharts'
import { MonthStats } from '@/types'
import { cn } from '@/lib/utils'
import { useForm } from '@inertiajs/react'

interface MonthlySpendingStatsProps{
    className? : string,
    stats : MonthStats[];
}

const monthData = [
    {
        month : "Janvier",
        amount : 1253.25,
        categories : [
            {
                name : "Courses",
                amount:1050
            },
            {
                name : "Électricité",
                amount:100.25
            },
            {
                name : "Voiture",
                amount:103
            }
        ],
        spenders : [
            {
                name : "Anas",
                amount : 553.25,
                categories : [
                    {
                        name : "Courses",
                        amount:453
                    },
                    {
                        name : "Électricité",
                        amount:100.25
                    }
                ]
            },
            {
                name : "Elham",
                amount : 700,
                categories : [
                    {
                        name : "Courses",
                        amount:597
                    },
                    {
                        name : "Voiture",
                        amount:103
                    }
                ]
            }

        ]
    },
]

const numMonthTabs = 10;

const MonthlySpendingStats = ({className, stats} : MonthlySpendingStatsProps) => {
    const [statsApi, setStatsApi] = React.useState<CarouselApi>()
    const [monthApi, setMonthApi] = React.useState<CarouselApi>()

    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedMonthStats, setSelectedMonthStats] = useState(stats[stats.length-1]);

    const {data, setData, post, processing, errors} = useForm<{'months' : {index : number, year:number}[]}>({
        'months' : stats.map((monthStats, _) => {
            return {index : monthStats.month_index, year : monthStats.year}
        })
    })

    const hasMounted = useRef(false);

    useEffect(() => {
      console.log('stats are : ', stats)
    }, [stats])
    

    const categoryData = useMemo(() => {
        const data = selectedMonthStats.categories.map((category, index) => {
            return {
                'category' : category.name,
                'amount' : category.amount,
            };
        });

        let amount = {label : "amount", color : "hsl(var(--chart-1))"};
        const config = {amount};

        return {
            data : data,
            config : config,
        }
    }, [selectedMonthStats])

    const spenderData = useMemo(() => {
        const data : Record<string, string|number> = {}
        const config : Record<string, {label : string, color : string}> = {}

        data['amount'] = 'amount';
        for(const spender of selectedMonthStats.spenders){
            data[spender.name] = spender.amount;
            config[spender.name] = {
                label : spender.name,
                color : spender.color,
            }
        }

        console.log('spenderData : ', {
            data : [data],
            config : config satisfies ChartConfig
        })

        return {
            data : [data],
            config : config satisfies ChartConfig
        }

    }, [selectedMonthStats])

    const updatedSelectedTab = (sel : number) => {
        if(!statsApi) return;
        if(sel === selectedTab) return;
        setSelectedTab(sel);
        
        if(sel === 0){
            statsApi?.scrollPrev();
        }else{
            statsApi?.scrollNext();
        }
    }

    useEffect(() => {
        if(!statsApi) return;
        console.log('api')
        statsApi.on("select", () => {
            setSelectedTab(statsApi.selectedScrollSnap())
        })
    }, [statsApi])
    
    useEffect(() => {
        if(!monthApi) return;
        console.log('month api');
        monthApi.scrollTo(numMonthTabs - 1, true);
    }, [monthApi])
    
    const updateMonthData = (direction  : 'forwards'|'backwards') => {
        if(direction === 'forwards'){
            setData('months', data.months.map((month, _) => {
                let monthIndex = month.index;
                let year = month.year;
                console.log('forwards : monthIndex : ',monthIndex,' year : ', year);
                
                if(monthIndex + 3 > 12){
                    monthIndex = monthIndex - 12 + 3;
                    year++;
                }else{
                    monthIndex+=3;
                }
                
                console.log('updated monthIdex : ',monthIndex,' updated year : ', year);
                
                return {
                    index : monthIndex,
                    year : year,
                }
            }))
        }else if(direction === 'backwards'){
            setData('months', data.months.map((month, _) => {
                let monthIndex = month.index;
                let year = month.year;
                console.log('backwards : monthIndex : ',monthIndex,' year : ', year);
                
                if(monthIndex - 3 < 1){
                    monthIndex = 12 - 3 + monthIndex;
                    year --;
                }else{
                    monthIndex-=3;
                }
                
                console.log('updated monthIdex : ',monthIndex,' updated year : ', year);
                return {
                    index : monthIndex,
                    year : year,
                }
            }))
        }
    }
    
    useEffect(() => {
        if(hasMounted.current){
            setTimeout(() => {
                post('/stats', {
                    preserveScroll : true,
                    only : ['month_stats'],
                })
            }, 1000);
        }else{
            hasMounted.current = true;
        }
    }, [data])
    
    useEffect(() => {
        setSelectedMonthStats(stats[stats.length -1]);
    }, [stats])
    

  return (
    <div className={cn('', className)}>
        <Carousel setApi={setMonthApi} className="w-full">
            <CarouselContent className="-ml-2 pt-16">
                {Array.from({ length: numMonthTabs }).map((_, index) => (
                <CarouselItem key={index} className="pl-2 pb-8 px-4">
                    <ToggleGroup type='single' className="p-0 flex gap-2">
                    {
                        stats.map((monthStats, index) => (
                            <Toggle pressed = {selectedMonthStats.month === monthStats.month} onPressedChange={() => {setSelectedMonthStats(monthStats); updatedSelectedTab(0);}} variant={'default'} key={index} className='w-full flex-1 h-full data-[state=on]:bg-white data-[state=on]:shadow-sm rounded-xl p-2 flex items-center justify-center flex-col'>
                                <span className='text-muted-foreground font-medium text-sm'>{monthStats.month.split(' ')[0]}</span>
                                <span className='text-typography font-black text-lg'>{Number(monthStats.amount).toFixed(2).split('.').join(',')} €</span>
                            </Toggle>
                        ))
                    }
                    </ToggleGroup>
                </CarouselItem>
                ))}
            </CarouselContent>
            <div className='absolute top-2 w-full  h-12 flex justify-center items-center'>
                <h2 className='font-bold text-typography'>{stats[0].month.split(' ')[0]} à {stats[stats.length-1].month.split(' ')[0]} {stats[stats.length-1].month.split(' ')[1]}</h2>
            </div>
            <CarouselPrevious scrollPrevAction={() => updateMonthData('backwards')} variant={'ghost'} className='w-12 h-12 top-8 left-2'/>
            <CarouselNext scrollNextAction={() => updateMonthData('forwards')} variant={'ghost'} className='w-12 h-12 top-8 right-2'/>
        </Carousel>

        <Card className='shadow-xl bg-white'>
            <CardContent>
                <div className='w-full flex gap-2'>
                    <div className='flex flex-col items-center justify-center flex-1 w-full'>
                        <span className='text-[0.7rem] text-muted-foreground font-light'>Transactions</span>
                        <span className='text-lg text-typography font-black'>{selectedMonthStats.transactions}</span>
                        {/* <span className='flex items-center text-sm font-bold gap-2'><TrendingUp className='w-4 h-4'/>5,2%</span> */}
                    </div>
                    <div className='flex flex-col items-center justify-center flex-1 w-full'>
                        <span className='text-[0.7rem] text-muted-foreground font-light'>Personnes</span>
                        <span className='text-lg text-typography font-black'>{selectedMonthStats.spenders.length}</span>
                        {/* <span className='flex items-center text-sm font-bold gap-2'><UserIcon className='w-4 h-4'/></span> */}
                    </div>
                    <div className='flex flex-col items-center justify-center flex-1 w-full'>
                        <span className='text-[0.7rem] text-muted-foreground font-light'>Total</span>
                        <span className='text-lg text-typography font-black rounded-lg'>{Number(selectedMonthStats.amount).toFixed(2).split('.').join(',')} €</span>
                        {/* <span className='flex items-center text-sm font-bold gap-2'><TrendingDown className='w-4 h-4'/>10,2%</span> */}
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card className='shadow-xl mt-8 bg-white'>
            <CardContent>
                {
                    (selectedMonthStats && selectedMonthStats.categories.length > 0 && selectedMonthStats.spenders.length > 0) &&
                    <Carousel setApi={setStatsApi} className="w-full">
                        <ToggleGroup type='single' className='rounded-lg bg-background w-full p-2'>
                            <Toggle disabled = {!statsApi} pressed = {selectedTab === 0} onPressedChange={() => updatedSelectedTab(0)} className='flex-1 w-full py-4 data-[state=on]:bg-white data-[state=on]:text-typography'>Catégories</Toggle>
                            <div className='w-px h-4 bg-white'></div>
                            <Toggle disabled = {!statsApi} pressed = {selectedTab === 1} onPressedChange={() => updatedSelectedTab(1)} className='flex-1 w-full py-4 data-[state=on]:bg-white data-[state=on]:text-typography'>Personnes</Toggle>
                        </ToggleGroup>
                        <CarouselContent className="-ml-2">
                            <CarouselItem className='pl-2'>
                                <ChartContainer
                                config={categoryData.config}
                                className="mx-auto aspect-square max-h-[270px]"
                                >
                                    <RadarChart data={categoryData.data} className='mt-8 pb-4 [&_svg]:overflow-visible'>
                                        <PolarGrid gridType="polygon" className='fill-sky-300 opacity-20'/>
                                        <PolarAngleAxis dataKey="category" />
                                        <Radar
                                        className='overflow-visible'
                                        dataKey="amount"
                                        fill="hsl(var(--chart-1))"
                                        fillOpacity={0.6}
                                        dot={{
                                            r: 4,
                                            fillOpacity: 1,
                                        }}
                                        />
                                    </RadarChart>
                                </ChartContainer>
                                <div className='grid grid-cols-2 gap-8 mt-8 items-center justify-start w-full max-h-[100px] overflow-y-auto'>
                                {
                                    selectedMonthStats.categories.map((category, index) => (
                                        <div key={index} className='w-full flex justify-center items-center gap-2'>
                                            <div className='flex flex-col'>
                                                <div className='flex gap-2 items-center'>
                                                    <span style={{backgroundColor : category.color}} className='rounded-full w-full h-1'></span>
                                                    <span className='font-bold text-sm'>{category.name}</span>
                                                    <span style={{backgroundColor : category.color}} className='rounded-full w-full h-1'></span>
                                                </div>
                                                
                                                <span className='text-[0.7rem] text-muted-foreground mt-2'>Total : <span className='font-bold'>{Number(category.amount).toFixed(2)} € / {Number(selectedMonthStats.amount).toFixed(2).toString()} €</span></span>
                                                <span className='text-[0.7rem] text-muted-foreground'>Pourcentage : <span className='font-bold'>{Number(category.amount/selectedMonthStats.amount*100).toFixed(2)} %</span></span>
                                                <span className='text-[0.7rem] text-muted-foreground'>Transactions : <span className='font-bold'>{category.transactions} / {selectedMonthStats.transactions}</span></span>
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                            </CarouselItem>
                            <CarouselItem className='pl-2'>
                                <ChartContainer
                                    config={spenderData.config}
                                    className="mx-auto aspect-square w-full max-w-[300px]"
                                    >
                                    <RadialBarChart
                                        data={spenderData.data}
                                        endAngle={180}
                                        innerRadius={80}
                                        outerRadius={130}
                                    >
                                        <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                        />
                                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                        <Label
                                            content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                    <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                    >
                                                    {selectedMonthStats.spenders.length.toString()}
                                                    </tspan>
                                                    <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                    >
                                                    Personnes
                                                    </tspan>
                                                </text>
                                                )
                                            }
                                            }}
                                        />
                                        </PolarRadiusAxis>
                                        {
                                            selectedMonthStats.spenders.map((spender, index) =>(
                                                <RadialBar
                                                key={index}
                                                dataKey={spender.name}
                                                stackId="spender"
                                                cornerRadius={10}
                                                fill={spender.color}
                                                className="stroke-transparent stroke-2"
                                                />
                                            ))
                                        }
                                    </RadialBarChart>
                                </ChartContainer>
                                <div className='grid grid-cols-2 items-center justify-start w-full'>
                                {
                                    selectedMonthStats.spenders.map((spender, index) => (
                                        <div key={index} className='w-full flex justify-center items-center gap-2'>
                                            <div className='flex flex-col'>
                                                <div className='flex gap-2 items-center'>
                                                    <span style={{backgroundColor : spender.color}} className='rounded-full w-full h-1'></span>
                                                    <span className='font-bold text-sm'>{spender.name}</span>
                                                    <span style={{backgroundColor : spender.color}} className='rounded-full w-full h-1'></span>
                                                </div>
                                                
                                                <span className='text-[0.7rem] text-muted-foreground mt-2'>Total : <span className='font-bold'>{spender.amount} € / {selectedMonthStats.amount.toString()} €</span></span>
                                                <span className='text-[0.7rem] text-muted-foreground'>Transactions : <span className='font-bold'>{spender.transactions} / {selectedMonthStats.transactions}</span></span>
                                                <span className='text-[0.7rem] text-muted-foreground'>Pourcentage : <span className='font-bold'>{Number(spender.transactions/selectedMonthStats.transactions*100).toFixed(2)} %</span></span>
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                }
                {
                    (!selectedMonthStats || selectedMonthStats.categories.length === 0 || selectedMonthStats.spenders.length === 0) &&
                    <div className='w-full aspect-square flex items-center justify-center gap-4 text-muted-foreground text-sm font-bold'>
                        <CircleXIcon /> <span>Aucune Dépense enregistrée ce mois</span>
                    </div>
                }
            </CardContent>
        </Card>
    </div>
  )
}

export default MonthlySpendingStats
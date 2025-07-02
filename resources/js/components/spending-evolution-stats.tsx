import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { BarChartIcon, Settings2Icon } from 'lucide-react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { Toggle } from './ui/toggle'
import { Category, ChartStats, Preferences, Spender } from '@/types'
import { ToggleGroup } from './ui/toggle-group'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { useForm } from '@inertiajs/react'
import SpendingEvolutionStatsFilters from './spending-evolution-stats-filters'



const chartData = [
  { month: "", desktop: 186},
  { month: "", desktop: 305},
  { month: "", desktop: 237},
  { month: "", desktop: 73},
  { month: "", desktop: 85},
  { month: "", desktop: 175},
  { month: "", desktop: 52},
  { month: "", desktop: 153},
  { month: "", desktop: 300},
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig


interface SpendingEvolutionStatsProps{
    className? : string,
    categories : Category[],
    spenders : Spender[],
    stats : ChartStats,
    preferences : Preferences,
}

interface FormData {
    num_months : number,
    spenders : Spender[],
    categories : Category[]
    [key: string]: any;
}
const SpendingEvolutionStats = ({className, categories, spenders, stats,  preferences} : SpendingEvolutionStatsProps) => {
    const [selectedSpenders, setSelectedSpenders] = useState(spenders);
    const [selectedCategories, setSelectedCategories] = useState(categories);
    const [selectedNumMonths, setSelectedNumMonths] = useState(3);
    const [selectedAnalysisStyle, setSelectedAnalysisStyle] = useState<'comparison'|'global'>('comparison')
    const [selectedVisualisationStyle, setSelectedVisualisationStyle] = useState<'bar'|'line'>('line')

    
  return (
    <div className={cn('', className)}>
        <div className='flex justify-between items-center'>
            <span className='text-sm text-muted-foreground font-bold'>Évolution mensuelle des dépenses</span>
            <div className='flex gap-0'>
                {/* <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant={'ghost'} className='w-12 h-12 rounded-full'>
                            <BarChartIcon/>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className='flex flex-col'>
                        <div className="mx-auto w-full max-w-sm mt-8 px-6 grow flex flex-col">
                            <DrawerHeader>
                                <DrawerTitle>Visualisation des données</DrawerTitle>
                                <DrawerDescription>Choisir votre style de présentation visuelle.</DrawerDescription>
                            </DrawerHeader>
                            <div className=" pb-0">
                                <div onClick={() => setVisualisationStyle('bar')} className={`${visualisationStyle === 'bar'? 'bg-white shadow-2xl cursor-default': 'cursor-pointer'} mt-3 h-[160px]  rounded-2xl border border-card-border p-4`}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={barData}>
                                        <Bar
                                            radius={5}
                                            dataKey="goal"
                                            style={
                                            {
                                                fill: "hsl(var(--foreground))",
                                                opacity: 0.9,
                                            } as React.CSSProperties
                                            }
                                        />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div onClick={() => setVisualisationStyle('line')}  className={`${visualisationStyle === 'line'? 'bg-white shadow-2xl cursor-default': 'cursor-pointer'} mt-3 h-[160px]  rounded-2xl border border-card-border p-4`}>
                                    <ChartContainer config = {chartConfig}>
                                        <AreaChart accessibilityLayer data={chartData}>
                                            <XAxis
                                                dataKey="month"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={2}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <defs>
                                                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                                    <stop
                                                    offset="5%"
                                                    stopColor="black"
                                                    stopOpacity={0.8}
                                                    />
                                                    <stop
                                                    offset="95%"
                                                    stopColor="black"
                                                    stopOpacity={0.1}
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <Area
                                                dataKey="desktop"
                                                type="natural"
                                                fill="url(#fillDesktop)"
                                                fillOpacity={0.4}
                                                stroke="black"
                                            />
                                        <Bar
                                            dataKey="goal"
                                            style={
                                            {
                                                fill: "hsl(var(--foreground))",
                                                opacity: 0.9,
                                            } as React.CSSProperties
                                            }
                                        />
                                        </AreaChart>
                                    </ChartContainer>
                                </div>
                            </div>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                <Button variant="outline">Annuler</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer> */}
                <SpendingEvolutionStatsFilters
                    spenders={spenders}
                    categories={categories}
                    selectedCategories={selectedCategories}
                    selectedSpenders={selectedSpenders}
                    selectedNumMonths={selectedNumMonths}
                    selectedAnalysisStyle={selectedAnalysisStyle}
                    selectedVisualisationStyle={selectedVisualisationStyle}
                    setSelectedCategories={setSelectedCategories}
                    setSelectedSpenders={setSelectedSpenders}
                    setSelectedNumMonths={setSelectedNumMonths}
                    setSelectedAnalysisStyle={setSelectedAnalysisStyle}
                    setSelectedVisualisationStyle={setSelectedVisualisationStyle}
                />

            </div>
        </div>
        <Card className='rounded-md  bg-white shadow-lg mt-2 '>
            <CardContent className=''>
                <div className='flex gap-2 mb-2'>
                    <div className='flex-1 bg-background p-2 rounded-lg flex flex-col items-center justify-center'>
                        <span className='text-muted-foreground text-xs font-light'>Style d'Analyse</span>
                        <span className='text-typography text-sm font-bold'>{selectedAnalysisStyle}</span>
                    </div>
                    <div className='flex-1 bg-background p-2 rounded-lg flex flex-col items-center justify-center'>
                        <span className='text-muted-foreground text-xs font-light'>Période Analysée</span>
                        <span className='text-typography text-sm font-bold'>{selectedNumMonths} Mois</span>
                    </div>
                </div>
                <div className='flex gap-2 mb-8'>
                    <div className='flex-1 bg-background p-2 rounded-lg flex flex-col items-center justify-center'>
                        <span className='text-muted-foreground text-xs font-light'>Personnes Analysées</span>
                        <span className='text-typography text-sm font-bold'>{selectedSpenders.length}</span>
                    </div>
                    <div className='flex-1 bg-background p-2 rounded-lg flex flex-col items-center justify-center'>
                        <span className='text-muted-foreground text-xs font-light'>Catégories Analysées</span>
                        <span className='text-typography text-sm font-bold'>{selectedCategories.length}</span>
                    </div>
                    
                </div>
                {
                    selectedVisualisationStyle === 'line' && selectedAnalysisStyle === 'comparison' &&
                    <ChartContainer config={stats.config}>
                        <LineChart
                            accessibilityLayer
                            data={stats.data}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                            >
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            {
                                spenders.map((spender, index) => (
                                    <Line
                                    key={index}
                                    dataKey={spender.name}
                                    type="monotone"
                                    stroke={spender.color}
                                    strokeWidth={2}
                                    dot={false}
                                    />
                                ))
                            }
                        </LineChart>
                    </ChartContainer>
                }
                {
                    selectedVisualisationStyle === 'bar' && selectedAnalysisStyle === 'comparison' &&
                    <ChartContainer config={stats.config}>
                        <BarChart accessibilityLayer data={stats.data}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                            />
                            {
                                spenders.map((spender, index) => (
                                    <Bar key={index} dataKey={spender.name} fill={spender.color} radius={4} />
                                ))
                            }
                        </BarChart>
                    </ChartContainer>
                }
                {
                    selectedVisualisationStyle === 'line' && selectedAnalysisStyle === 'global' &&
                    <ChartContainer config={stats.config}>
                        <LineChart
                            accessibilityLayer
                            data={stats.data}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                            >
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Line
                            dataKey='Global'
                            type="monotone"
                            stroke={preferences.charts_color}
                            strokeWidth={2}
                            dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                }
                {
                    selectedVisualisationStyle === 'bar' && selectedAnalysisStyle === 'global' &&
                    <ChartContainer config={stats.config}>
                        <BarChart accessibilityLayer data={stats.data}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                            />
                            <Bar  dataKey='Global' fill={preferences.charts_color} radius={4} />

                        </BarChart>
                    </ChartContainer>
                }
            
            </CardContent>
        </Card>

    </div>
  )
}

export default SpendingEvolutionStats
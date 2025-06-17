import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { BarChartIcon, Settings2Icon } from 'lucide-react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { Toggle } from './ui/toggle'
import { Category, ChartStats, Spender } from '@/types'
import { ToggleGroup } from './ui/toggle-group'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { useForm } from '@inertiajs/react'

const barData = [
  {
    goal: 186,
  },
  {
    goal: 305,
  },
  {
    goal: 237,
  },
  {
    goal: 73,
  },
  {
    goal: 85,
  },
  {
    goal: 175,
  },
  {
    goal: 52,
  },
  {
    goal: 153,
  },
  {
    goal: 300,
  },
]

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
}

interface FormData {
    num_months : number,
    spenders : Spender[],
    categories : Category[]
    [key: string]: any;
}
const SpendingEvolutionStats = ({className, categories, spenders, stats} : SpendingEvolutionStatsProps) => {
    const [visualisationStyle, setVisualisationStyle] = useState<'bar'|'line'>('line')
    // const [analysisStylee, setAnalysisStylee] = useState<'comparison'|'global'>('comparison')
    const [selectedCategoriess, setSelectedCategoriess] = useState(categories)
    const [selectAll, setselectAll] = React.useState(true);
    const {data, setData,put, processing, errors} = useForm<FormData>({
        num_months : 3,
        spenders : spenders as Spender[],
        categories : categories as Category[],
        analysis_style : 'comparison',
    })

    useEffect(() => {
      put('/stats', {
        preserveScroll : true,
        only:['evolution_stats'],
        onSuccess : () => {
            
        }
      })
    }, [data])

    useEffect(() => {
      console.log('gotten the stats : ', stats)
    }, [stats])
        

    const updateSpenders = (selectedSpender : string) => {
        if(data.spenders.some((spender) => spender.name ===selectedSpender)){
        var filteredSpenders = data.spenders.filter(spender => spender.name !== selectedSpender);
        setData('spenders',filteredSpenders)
        }else{
        let newSpender = spenders.find((spender) => spender.name === selectedSpender);
        if(newSpender !== undefined){
            setData('spenders',[...data.spenders, newSpender]);
        }
        }
    }

    const updateCategories = (selectedCategory : string) => {
        if(data.categories.some((category) => category.name === selectedCategory)){
        var filterCategories = data.categories.filter(category => category.name !== selectedCategory);
        if(filterCategories.length != categories.length && selectAll){
            setselectAll(false);
        }
        if(filterCategories.length === categories.length && !selectAll){
            setselectAll(true);
        }
        setData('categories',filterCategories);
        }else{
        var newCategory = categories.find((category) => category.name === selectedCategory);
        if(newCategory !== undefined){
            const newCategories = [...data.categories, newCategory];
            if(newCategories.length != categories.length && selectAll){
            setselectAll(false);
            }
            if(newCategories.length === categories.length && !selectAll){
            setselectAll(true);
            }
            setData('categories',newCategories);
        }
        }
    }

    const updateSelectAllFilter = (selectAll : boolean) => {
        setData('categories',selectAll? [] : categories);
        setselectAll(!selectAll);
    }
  return (
    <div className={cn('', className)}>
        <div className='flex justify-between items-center'>
            <span className='text-sm text-muted-foreground font-bold'>Évolution mensuelle des dépenses</span>
            <div className='flex gap-0'>
                <Drawer>
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
                </Drawer>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant={'ghost'} className='w-12 h-12 rounded-full'>
                            <Settings2Icon/>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm flex flex-col h-full mt-8 px-4">
                            <DrawerHeader className='flex'>
                                <DrawerTitle>Paramètres de visualisation des données</DrawerTitle>
                                <DrawerDescription>Personnalisez vos choix.</DrawerDescription>
                            </DrawerHeader>
                            <div className="flex flex-col grow w-full overflow-y-scroll">
                                <span className="text-sm font-bold">Période d'analyse</span>
                                <div >
                                    <ul className="flex justify-start mt-6 w-full p-2 rounded-md bg-white border border-card-border">
                                        <li key={'duration_1'} className="flex items-center justify-center gap-2 text-typography flex-1">
                                            <Toggle
                                            pressed = {data.num_months === 3}
                                            onPressedChange={() => setData('num_months', 3)} className="flex-1"
                                            >
                                                3 Mois
                                            </Toggle>
                                        </li>
                                        <li key={'duration_2'} className="flex items-center justify-center gap-2 text-typography flex-1">
                                            <Toggle
                                            pressed = {data.num_months === 6}
                                            onPressedChange={() => setData('num_months', 6)} className="flex-1"
                                            >
                                                6 Mois
                                            </Toggle>
                                        </li>
                                        <li key={'duration_3'} className="flex items-center justify-center gap-2 text-typography flex-1">
                                            <Toggle
                                            pressed = {data.num_months === 9}
                                            onPressedChange={() => setData('num_months', 9)} className="flex-1"
                                            >
                                                9 Mois
                                            </Toggle>
                                        </li>
                                        <li key={'duration_4'} className="flex items-center justify-center gap-2 text-typography flex-1">
                                            <Toggle
                                            pressed = {data.num_months === 12}
                                            onPressedChange={() => setData('num_months', 12)} className="flex-1"
                                            >
                                                12 Mois
                                            </Toggle>
                                        </li>
                                    </ul>
                                </div>
                                <div className="h-px w-full bg-popover-border mt-4 mb-4 px-6"></div>
                                <span className="text-sm font-bold">Style d'analyse</span>
                                <ul className="flex justify-start items-center gap-1 mt-4 w-full p-1 rounded-md bg-white border border-card-border">
                                    <li key={'analysis_style_1'} className="flex items-center justify-center gap-2 text-typography flex-1">
                                        <Toggle
                                        pressed = {data.analysis_style === 'comparison'}
                                        onPressedChange={() => setData('analysis_style','comparison')} className="flex-1"
                                        >
                                            Comparaison
                                        </Toggle>
                                    </li>
                                    <div className='h-6 w-px bg-accent'></div>
                                    <li key={'analysis_style_2'} className="flex items-center justify-center gap-2 text-typography flex-1">
                                        <Toggle
                                        pressed = {data.analysis_style === 'global'}
                                        onPressedChange={() => setData('analysis_style','global')} className="flex-1"
                                        >
                                            Global
                                        </Toggle>
                                    </li>
                                </ul>
                                <div className="h-px w-full bg-popover-border mt-4 mb-4 px-6"></div>
                                <span className="text-sm font-bold">Personnes analysées</span>
                                <ToggleGroup type="multiple" className="flex py-1 px-1 gap-1 rounded-xl bg-white border border-card-border mt-4">
                                    {
                                        spenders.map((spender, index) =>(
                                            <div key={index} className="flex-1">
                                                <Toggle
                                                    pressed = {data.spenders.some((sp) => sp.id === spender.id)}
                                                    onPressedChange={() => updateSpenders(spender.name)} className='w-full' key={index}
                                                >
                                                    {spender.name}
                                                </Toggle>
                                            </div>
                                        ))
                                    }
                                </ToggleGroup>
                                <div className="h-px w-full bg-popover-border mt-4 mb-4 px-6"></div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-bold">Catégories</span>
                                    <div className="flex gap-4">
                                    <Checkbox
                                        id={`select-all-categories-id`}
                                        checked={selectAll}
                                        onCheckedChange={() => updateSelectAllFilter(selectAll)}
                                    />
                                    <Label htmlFor={`select-all-categories-id`} className={`${!selectAll? "" : "text-muted-foreground"} capitalize text-sm font-light`}>
                                        Tout Sélectionner
                                    </Label>
                                    </div>
                                </div>
                                <ul className="flex flex-wrap justify-start gap-1 mt-6 pb-6">
                                {
                                    categories.map((category, index) => (
                                    <li key={index} className="flex items-center justify-center gap-1 text-typography">
                                        <Toggle
                                            
                                            pressed = {data.categories.some((cat) => cat.id === category.id)}
                                            onPressedChange={() => updateCategories(category.name)} className="flex-1" key={index}
                                            >
                                            <span className='text-xs'>{category.name}</span>
                                        </Toggle>
                                    </li>
                                    ))
                                }
                                </ul>
                            </div>
                            <DrawerFooter className='flex pb-12 flex-row border-t border-card-border'>
                                <Button className='flex-1'>Confirmer</Button>
                                <DrawerClose className='flex-1' asChild>
                                <Button variant="outline">Annuler</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>

            </div>
        </div>
        <Card className='rounded-md  bg-white shadow-lg mt-2 '>
            <CardContent className=''>
                <div className='flex gap-2 mb-2'>
                    <div className='flex-1 bg-background p-2 rounded-lg flex flex-col items-center justify-center'>
                        <span className='text-muted-foreground text-xs font-light'>Style d'Analyse</span>
                        <span className='text-typography text-sm font-bold'>{data.analysis_style}</span>
                    </div>
                    <div className='flex-1 bg-background p-2 rounded-lg flex flex-col items-center justify-center'>
                        <span className='text-muted-foreground text-xs font-light'>Période Analysée</span>
                        <span className='text-typography text-sm font-bold'>{data.num_months} Mois</span>
                    </div>
                </div>
                <div className='flex gap-2 mb-8'>
                    <div className='flex-1 bg-background p-2 rounded-lg flex flex-col items-center justify-center'>
                        <span className='text-muted-foreground text-xs font-light'>Personnes Analysées</span>
                        <span className='text-typography text-sm font-bold'>{data.spenders.length}</span>
                    </div>
                    <div className='flex-1 bg-background p-2 rounded-lg flex flex-col items-center justify-center'>
                        <span className='text-muted-foreground text-xs font-light'>Catégories Analysées</span>
                        <span className='text-typography text-sm font-bold'>{data.categories.length}</span>
                    </div>
                    
                </div>
                {
                    visualisationStyle === 'line' && data.analysis_style === 'comparison' &&
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
                    visualisationStyle === 'bar' && data.analysis_style === 'comparison' &&
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
                    visualisationStyle === 'line' && data.analysis_style === 'global' &&
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
                            stroke='hsl(199, 89%, 48%)'
                            strokeWidth={2}
                            dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                }
                {
                    visualisationStyle === 'bar' && data.analysis_style === 'global' &&
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
                            <Bar  dataKey='Global' fill='hsl(199, 89%, 48%)' radius={4} />

                        </BarChart>
                    </ChartContainer>
                }
            
            </CardContent>
        </Card>

    </div>
  )
}

export default SpendingEvolutionStats
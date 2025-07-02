import React, { FormEvent, useEffect, useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'
import { Settings2Icon } from 'lucide-react'
import { Toggle } from './ui/toggle'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { router, useForm } from '@inertiajs/react'
import { Category, Spender } from '@/types'
import { cn } from '@/lib/utils'
import { areCategoryArraysEqual, areSpenderArraysEqual } from '@/lib/data'
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts'
import { ChartConfig, ChartContainer } from './ui/chart'

interface ComponentProps{
    className? : string,
    spenders : Spender[],
    categories : Category[],
    selectedSpenders : Spender[],
    selectedCategories : Category[],
    selectedNumMonths : number,
    selectedAnalysisStyle : 'comparison' | 'global',
    selectedVisualisationStyle : 'line' | 'bar',
    setSelectedSpenders : React.Dispatch<React.SetStateAction<Spender[]>>
    setSelectedCategories : React.Dispatch<React.SetStateAction<Category[]>>
    setSelectedNumMonths : React.Dispatch<React.SetStateAction<number>>
    setSelectedAnalysisStyle : React.Dispatch<React.SetStateAction<'comparison' | 'global'>>
    setSelectedVisualisationStyle : React.Dispatch<React.SetStateAction<'line' | 'bar'>>

}

interface DataForm{
    num_months : number,
    spenders : Spender[],
    categories : Category[],
    analysis_style: 'comparison' | 'global',
    [k : string] : any,
}


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

const SpendingEvolutionStatsFilters = ({className, 
                                        spenders,
                                        categories,
                                        selectedCategories,
                                        selectedSpenders,
                                        selectedNumMonths,
                                        selectedAnalysisStyle,
                                        selectedVisualisationStyle,
                                        setSelectedCategories,
                                        setSelectedSpenders,
                                        setSelectedNumMonths,
                                        setSelectedAnalysisStyle,
                                        setSelectedVisualisationStyle} : ComponentProps) => {
    const [selectAll, setselectAll] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedDrawerCategories, setSelectedDrawerCategories] = useState(selectedCategories)
    const [selectedDrawerSpenders, setSelectedDrawerSpenders] = useState(selectedSpenders)
    const [selectedDrawerNumMonths, setSelectedDrawerNumMonths] = useState(selectedNumMonths)
    const [selectedDrawerAnalysisStyle, setSelectedDrawerAnalysisStyle] = useState(selectedAnalysisStyle)
    const [selectedDrawerVisualisationStyle, setSelectedDrawerVisualisationStyle] = useState(selectedVisualisationStyle)
    const {data, setData,put, reset, processing, errors} = useForm<DataForm>({
        num_months : selectedNumMonths,
        spenders : selectedSpenders as Spender[],
        categories : selectedCategories as Category[],
        analysis_style: selectedDrawerAnalysisStyle,
    })

    const updateSpenders = (selectedSpender : string) => {
        if(selectedDrawerSpenders.some((spender) => spender.name ===selectedSpender)){
        var filteredSpenders = selectedDrawerSpenders.filter(spender => spender.name !== selectedSpender);
            setSelectedDrawerSpenders(filteredSpenders);
            setData('spenders',filteredSpenders)
        }else{
        let newSpender = spenders.find((spender) => spender.name === selectedSpender);
        if(newSpender !== undefined){
            setSelectedDrawerSpenders([...selectedDrawerSpenders, newSpender]);
            setData('spenders',[...selectedDrawerSpenders, newSpender]);
        }
        }
    }

    const updateCategories = (selectedCategory : string) => {
        if(selectedDrawerCategories.some((category) => category.name === selectedCategory)){
        var filterCategories = selectedDrawerCategories.filter(category => category.name !== selectedCategory);
        if(filterCategories.length != categories.length && selectAll){
            setselectAll(false);
        }
        if(filterCategories.length === categories.length && !selectAll){
            setselectAll(true);
        }
        setSelectedDrawerCategories(filterCategories);
        setData('categories',filterCategories);
        }else{
        var newCategory = categories.find((category) => category.name === selectedCategory);
        if(newCategory !== undefined){
            const newCategories = [...selectedDrawerCategories, newCategory];
            if(newCategories.length != categories.length && selectAll){
                setselectAll(false);
            }
            if(newCategories.length === categories.length && !selectAll){
                setselectAll(true);
            }
            setSelectedDrawerCategories(newCategories)
            setData('categories',newCategories);
        }
        }
    }

    const updateSelectAllFilter = (selectAll : boolean) => {
        setSelectedDrawerCategories(categories);
        setData('categories',selectAll? [] : categories);
        setselectAll(!selectAll);
    }

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault();

        console.log('data num months ', selectedDrawerNumMonths, ' selectedNumMonths ', selectedNumMonths)
        if(selectedDrawerNumMonths !== selectedNumMonths ||
            !areSpenderArraysEqual(selectedDrawerSpenders, selectedSpenders) ||
            !areCategoryArraysEqual(selectedDrawerCategories, selectedCategories) ||
            selectedDrawerAnalysisStyle !== selectedAnalysisStyle ||
            selectedDrawerVisualisationStyle !== selectedVisualisationStyle
        ){
            console.log('need to fetch new data');
            put('/stats', {
                preserveScroll : true,
                only: ['evolution_stats'],
                onSuccess : () => {
                    console.log("hh")
                    setSelectedSpenders(selectedDrawerSpenders);
                    setSelectedCategories(selectedDrawerCategories);
                    setSelectedNumMonths(selectedDrawerNumMonths);
                    setSelectedAnalysisStyle(selectedDrawerAnalysisStyle);
                    setSelectedVisualisationStyle(selectedDrawerVisualisationStyle);
                }
            })
        }else if (selectedDrawerVisualisationStyle !== selectedVisualisationStyle){
            setSelectedVisualisationStyle(selectedDrawerVisualisationStyle);
        }
        setOpen(false);
    }

    const resetData = () => {
        reset();
        setselectAll(selectedCategories.length === categories.length);
        setSelectedDrawerCategories(selectedCategories);
        setSelectedDrawerSpenders(selectedSpenders);
        setSelectedDrawerNumMonths(selectedNumMonths);
        setSelectedDrawerAnalysisStyle(selectedAnalysisStyle);
        setSelectedDrawerVisualisationStyle(selectedVisualisationStyle);
        console.log('data categories : ', data.categories);
        console.log('selected drawer categories : ', selectedCategories);
        console.log('selected categories : ', selectedDrawerCategories);
    }

    const updateNumMonths = (numMonths : string) => {
        if(!numMonths) return;
        setSelectedDrawerNumMonths(Number(numMonths));
        setData('num_months', Number(numMonths));
    }
    
    const updateAnalysisStyle = (type : string) => {
        if(!type) return;
        setSelectedDrawerAnalysisStyle(type as "comparison" | "global");
        setData('analysis_style', type as "comparison" | "global");
    }
    const updateVisualisationStyle = (type : string) => {
        if(!type) return;
        setSelectedDrawerVisualisationStyle(type as "line" | "bar");
    }

    useEffect(() => {
      console.log('data num months : ', data.num_months);
    }, [data])
    useEffect(() => {
      console.log('selectedDrawerVisualisationStyle : ', selectedDrawerVisualisationStyle); 
    }, [selectedDrawerVisualisationStyle])
    

  return (
    <Drawer open = {open} onOpenChange = {setOpen}>
        <DrawerTrigger asChild>
            <Button variant={'ghost'} className='w-12 h-12 rounded-full'>
                <Settings2Icon/>
            </Button>
        </DrawerTrigger>
        <DrawerContent className={cn('', className)}>
            <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm flex flex-col h-full mt-8 px-4">
                <DrawerHeader className='flex'>
                    <DrawerTitle>Paramètres de visualisation des données</DrawerTitle>
                    <DrawerDescription>Personnalisez vos choix.</DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col grow w-full overflow-y-scroll">
                    <span className="text-sm font-bold">Période d'analyse</span>
                    <div >
                        <ToggleGroup type='single' value={Number(selectedDrawerNumMonths).toString()} onValueChange={updateNumMonths} className="flex justify-start mt-6 w-full p-2 rounded-md bg-white border border-card-border">
                            <ToggleGroupItem
                                value = {Number(3).toString()}
                                className="flex items-center justify-center rounded-md gap-2 text-typography flex-1"
                            >
                                3 Mois
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value = {Number(6).toString()}
                                className="flex items-center justify-center rounded-md gap-2 text-typography flex-1"
                            >
                                6 Mois
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value = {Number(9).toString()}
                                className="flex items-center justify-center rounded-md gap-2 text-typography flex-1"
                            >
                                9 Mois
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value = {Number(12).toString()}
                                className="flex items-center justify-center rounded-md gap-2 text-typography flex-1"
                            >
                                12 Mois
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                    <div className="h-px w-full bg-popover-border mt-4 mb-4 px-6"></div>
                    <span className="text-sm font-bold">Style d'analyse</span>
                    <ToggleGroup type='single' value={selectedDrawerAnalysisStyle} onValueChange={updateAnalysisStyle} className="flex justify-start items-center gap-1 mt-4 w-full p-1 rounded-md bg-white border border-card-border">
                        <ToggleGroupItem
                            value={'comparison' as 'comparison' | 'global'}
                            className="flex items-center justify-center rounded-md gap-2 text-typography flex-1"
                        >
                            Comparaison
                        </ToggleGroupItem>
                        <ToggleGroupItem 
                            value={'global' as 'comparison' | 'global'}
                            className="flex items-center justify-center rounded-md gap-2 text-typography flex-1"
                        >
                            Global
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <div className="h-px w-full bg-popover-border mt-4 mb-4 px-6"></div>
                    <span className="text-sm font-bold">Style de visualisation</span>
                    <ToggleGroup type='single' value={selectedDrawerVisualisationStyle} onValueChange={updateVisualisationStyle} className="flex justify-start items-center gap-1 mt-4 w-full p-1 rounded-md bg-white border border-card-border">
                        <ToggleGroupItem
                            value={'bar' as 'line' | 'bar'}
                            className="flex items-center justify-center rounded-md h-20 gap-2 text-typography flex-1"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData}>
                                <Bar
                                    radius={5}
                                    dataKey="goal"
                                    style={
                                    {
                                        fill: `${selectedDrawerVisualisationStyle === 'bar'? 'white': 'black'}`,
                                        opacity: 0.9,
                                    } as React.CSSProperties
                                    }
                                />
                                </BarChart>
                            </ResponsiveContainer>
                        </ToggleGroupItem>
                        <ToggleGroupItem 
                            value={'line' as 'line' | 'bar'}
                            className="flex items-center justify-center rounded-md h-20 w-full gap-2 text-typography flex-1"
                        >
                            <ChartContainer className='w-full h-[150%] translate-y-4' config = {chartConfig}>
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
                                            offset={`${selectedDrawerVisualisationStyle === 'line'? '45%': '5%'}`}
                                            stopColor={`${selectedDrawerVisualisationStyle === 'line'? 'white': 'black'}`}
                                            stopOpacity={1}
                                            />
                                            <stop
                                            offset="95%"
                                            stopColor={`${selectedDrawerVisualisationStyle === 'line'? 'white': 'black'}`}
                                            stopOpacity={0.1}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        dataKey="desktop"
                                        type="natural"
                                        fill="url(#fillDesktop)"
                                        fillOpacity={0.4}
                                        stroke={`${selectedDrawerVisualisationStyle === 'line'? 'white': 'black'}`}
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
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <div className="h-px w-full bg-popover-border mt-4 mb-4 px-6"></div>
                    <span className="text-sm font-bold">Personnes analysées</span>
                    <ToggleGroup type="multiple" className="flex py-1 px-1 gap-1 rounded-xl bg-white border border-card-border mt-4">
                        {
                            spenders.map((spender, index) =>(
                                <div key={index} className="flex-1">
                                    <Toggle
                                        pressed = {selectedDrawerSpenders.some((sp) => sp.id === spender.id)}
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
                                
                                pressed = {selectedDrawerCategories.some((cat) => cat.id === category.id)}
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
                    <Button type='submit' className='flex-1'>Confirmer</Button>
                    <DrawerClose className='flex-1' asChild>
                    <Button onClick={resetData} variant="outline">Annuler</Button>
                    </DrawerClose>
                </DrawerFooter>
            </form>
        </DrawerContent>
    </Drawer>
  )
}

export default SpendingEvolutionStatsFilters
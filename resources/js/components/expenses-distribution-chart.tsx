import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Expense } from "@/types"

interface ExpensesDistributionChartProps{
    expenses : Expense[],
}

interface CategoryData{
    name : string,
    amount : number,
    fill : string,
}

export function ExpensesDistributionChart({expenses} : ExpensesDistributionChartProps) {
    const [canRenderChart, setCanRenderChart] = React.useState(false)

    const totalExpenses = React.useMemo(() => {
        return expenses.length;
    }, [expenses])

    React.useEffect(() => {
        if (expenses.length > 0) {
            const timeout = setTimeout(() => {
            setCanRenderChart(true)
            }, 400) // Try 100ms delay for better reliability

            return () => clearTimeout(timeout)
        } else {
            setCanRenderChart(false)
        }
    }, [])

    const chart = React.useMemo(() => {
        const categoryMap = new Map<string, {color : string, amount : number}>();

        for(let i = 0; i < expenses.length ; i++){
            const name = expenses[i].category.name;
            const currentTotal = categoryMap.get(name) || {color : expenses[i].category.color, amount : 0};
            categoryMap.set(name, {color : currentTotal.color, amount : currentTotal.amount + Number(expenses[i].amount)});
        }

        const data : CategoryData[] = [];
        const config : ChartConfig = {} satisfies ChartConfig;
        let chartIndex = 1;

        for(const [category, value] of categoryMap.entries()){
            data.push({name : category, amount : value.amount, fill : value.color});
            
            config[category] = {
                label : category,
                color : value.color,
            }

            chartIndex++;
        }

        data.sort((a, b) => {
            return b.amount - a.amount;
        });

        return {data : data, config : config};
    }, [expenses])
  

  return (
    <div className="mt-12">
        <h2 className="text-muted-foreground text-sm font-bold">Distribution des dépenses mensuelles</h2>
        <Card className="flex flex-row items-center bg-white mt-2 shadow-xl border-none relative pr-2">
            <CardContent className="flex-1 pb-0 px-0 relative z-20">
                {canRenderChart && chart.data.length > 0 &&
                <ChartContainer
                config={chart.config}
                className="aspect-square max-h-[200px]"
                >
                    <PieChart>
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                        data={chart.data}
                        dataKey="amount"
                        nameKey="name"
                        innerRadius={45}
                        strokeWidth={5}
                        paddingAngle={3}
                        isAnimationActive={true}    
                        key={chart.data.map(d => d.name).join("-")}
                        >
                        <Label
                            content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    <tspan
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    className="fill-foreground text-3xl font-black"
                                    >
                                    {totalExpenses.toLocaleString()}
                                    </tspan>
                                    <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground"
                                    >
                                    Dépenses
                                    </tspan>
                                </text>
                                )
                            }
                            }}
                        />
                        </Pie>
                    </PieChart>
                </ChartContainer>
                
                }
            
                {
                    !canRenderChart && 
                    <div className="h-[200px] aspect-square flex items-center justify-center flex-col p-4">
                    </div>
                }
            </CardContent>
            {
                canRenderChart && chart.data.length > 0 &&
                <div className=" flex-1 pr-6 max-w-[180px] overflow-y-auto max-h-[140px]">
                    <ul className="flex flex-col gap-2  relative z-10">
                    {
                        chart.data.map((data, index) => (
                            <li key={index} style={{transitionDelay : `${index*650/chart.data.length + 400}ms`}} className={`text-xs flex items-center justify-between transition-all duration-400 opacity-100 starting:opacity-0 translate-y-0 starting:translate-y-2`}>
                                <div className="flex items-center gap-2">
                                    <div style = {{backgroundColor : data.fill}} className={`w-4 h-4 rounded-sm`}></div>
                                    <span className="text-muted-foreground">{data.name}</span>
                                </div>
                                
                                <span className="font-bold ">{data.amount.toFixed(2).toString().split('.').join(',')} €</span>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            }
        </Card>
    </div>
  )
}

import { Expense, MonthlySpenderStats, Spender } from '@/types'
import React from 'react'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts'
import { getSpenderColor } from '@/lib/data'
import { capitalizeFirst } from '@/lib/utils'

interface RepartitionPerUserProps{
    stats : MonthlySpenderStats,
    totalExpenses : number,
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80, hi : 266},
]
 
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
  hi: {
    label: "hi",
    color: "#60a5fa",
  },
} satisfies ChartConfig


const ExpensesDistributionPerUserChart = ({totalExpenses, stats} : RepartitionPerUserProps) => {

  const [canRenderChart, setCanRenderChart] = React.useState(false)

  React.useEffect(() => {
      if (totalExpenses > 0) {
          const timeout = setTimeout(() => {
          setCanRenderChart(true)
          }, 1000)

          return () => clearTimeout(timeout)
      } else {
          setCanRenderChart(false)
      }
  }, [])

  return (
    <div className=' mt-10 w-full'>
      <span className='text-sm text-muted-foreground font-bold'>Distribution par personne</span>     
      {
        canRenderChart && 
        <ChartContainer config={stats.config} className="min-h-[200px] rounded-md p-4 bg-white shadow-lg">
          <BarChart accessibilityLayer data={[stats.data]}>
            <CartesianGrid vertical={false} strokeDasharray="3 3"/>
            <YAxis
              tickFormatter={(value) => `${value} €`}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Legend/>
            <ChartTooltip content={<ChartTooltipContent />} />
            {
              stats.spenders.map((spender, index) => (
                <Bar key={index} dataKey={spender.name}  fill={spender.fill} radius={4} />
              ))
            }
            {/* <Bar dataKey="Total" fill={getSpenderColor(20)} radius={4} /> */}
          </BarChart>
        </ChartContainer>
      }
      {
        !canRenderChart && 
        <div className="h-[200px] w-full aspect-square flex items-center justify-center flex-col p-4 rounded-md bg-white shadow-lg">
        </div>
      }
    </div>
  )
}

export default ExpensesDistributionPerUserChart

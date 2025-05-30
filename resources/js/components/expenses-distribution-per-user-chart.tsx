import { Expense, Spender } from '@/types'
import React from 'react'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts'
import { getSpenderColor } from '@/lib/data'
import { capitalizeFirst } from '@/lib/utils'

interface RepartitionPerUserProps{
    expenses : Expense[]
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


const ExpensesDistributionPerUserChart = ({expenses} : RepartitionPerUserProps) => {

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
      const spenderMap = new Map<number, {name : string, color : string, amount : number}>();

      for(let i = 0; i < expenses.length ; i++){
          const id = expenses[i].spender.id;
          const currentTotal = spenderMap.get(id) || {name :expenses[i].spender.name, color : expenses[i].spender.color, amount : 0};
          spenderMap.set(id, {name :currentTotal.name, color : currentTotal.color, amount : Number((currentTotal.amount + Number(expenses[i].amount)).toFixed(2))});
      }
      const config : ChartConfig = {} satisfies ChartConfig;
      let chartIndex = 1;

      let month = new Date(expenses[0].date).toLocaleString('default', { month: 'long' });
      month = capitalizeFirst(month);
      
      const spenders : {[key : string] : number} = {};
      const spenderData : {name : string, color : string, amount : number}[] = [];

      Array.from(spenderMap.entries()).forEach(([spender, value], index) => {
        spenders[value.name] = value.amount;
        spenderData.push(value);
      });

      // spenders['Total'] = expenses.reduce((acc, current) => acc + Number(current.amount), 0);

      const data : {[key : string] : number|string}[] = [{month, ...spenders}];
      for(const [spender, value] of spenderMap.entries()){
          
          config[spender] = {
              label : spender,
              color : value.color,
          }

          chartIndex++;
      }

      return {data : data, config : config, spenderData : spenderData};
  }, [expenses])
  return (
    <div className=' mt-10 w-full'>
      <span className='text-sm text-muted-foreground font-bold'>Distribution par personne</span>
      <ChartContainer config={chart.config} className="min-h-[200px] rounded-md p-6 bg-white shadow-lg">
        <BarChart accessibilityLayer data={chart.data}>
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
            chart.spenderData.map((spender, index) => (
              <Bar key={index} dataKey={spender.name} stackId={'a'} fill={spender.color} radius={4} />
            ))
          }
          {/* <Bar dataKey="Total" fill={getSpenderColor(20)} radius={4} /> */}
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default ExpensesDistributionPerUserChart

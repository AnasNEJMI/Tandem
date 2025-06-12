import { cn } from '@/lib/utils'
import { SpendingTrendPerSpenderStats } from '@/types'
import React from 'react'
import { Card, CardContent } from './ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { useForm } from '@inertiajs/react'

interface SpendingTrendPerSpenderProps{
    className? : string,
    stats :SpendingTrendPerSpenderStats,
}

const SpendingTrendPerSpender = ({className, stats} : SpendingTrendPerSpenderProps) => {
  const {data, setData, post, processing, errors} = useForm();
  return (
    <div className={cn('', className)}>
        <span className='text-sm text-muted-foreground font-bold mt-8'>Tendenses de dépenses par personne</span>
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
                    {
                      Object.entries(stats.config).map(([spenderName, spenderData], index) => (
                        <linearGradient id={`fill-${spenderName}`} x1="0" y1="0" x2="0" y2="1">
                            <stop
                            offset="5%"
                            stopColor={(spenderData as {label : string, color : string}).color}
                            stopOpacity={0.8}
                            />
                            <stop
                            offset="95%"
                            stopColor={(spenderData as {label : string, color : string}).color}
                            stopOpacity={0.1}
                            />
                        </linearGradient>

                      ))
                    }
                    </defs>
                    {
                      Object.entries(stats.config).map(([spenderName, spenderData], index) => (
                        <Area
                        key={index}
                        dataKey={(spenderData as {label : string, color : string}).label}
                        type="natural"
                        fill={`url(#fill-${spenderName})`}
                        fillOpacity={0.4}
                        stroke={(spenderData as {label : string, color : string}).color}
                        // stackId="a"
                        />
                      ))
                    }
                </AreaChart>
            </ChartContainer>
          }
          {
              processing &&
              <div className='ml-3 bg-background animate-pulse w-full h-48 rounded-lg mb-4'></div>
          }
          </CardContent>
        </Card>
    </div>
  )
}

export default SpendingTrendPerSpender
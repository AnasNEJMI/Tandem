import React from 'react'
import { useEffect, useState } from "react"
import { animate, useMotionValue } from "framer-motion"
import { cn } from '@/lib/utils'

interface AnimatedCounterProps{
    to : number,
    duration? : number,
    delay? : number,
    decimals? : number
    className? : string
}

const AnimatedCounter = ({to, duration = 1,delay = 0, decimals = 2, className} : AnimatedCounterProps) => {
    const count = useMotionValue(0);
    const [display, setDisplay] = useState("0.00");

    useEffect(() => {
        const controls = animate(count, to, {
            duration,
            delay,
            ease:"easeOut",
            onUpdate : (latest) => {
                setDisplay(latest.toFixed(2));
            }   
        })

        return controls.stop;
    }, [to, duration, decimals])
    
    return (
    <span className={cn('', className)}>
        {display.split('.').join(',')}
    </span>
  )
}

export default AnimatedCounter
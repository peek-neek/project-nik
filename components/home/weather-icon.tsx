"use client"

import React from "react"
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
} from "lucide-react"
import { motion, TargetAndTransition, Transition } from "motion/react"

import type { WeatherKind } from "@/lib/weather"
import { cn } from "@/lib/utils"

const loop = (duration: number): Transition => ({
  duration,
  repeat: Infinity,
  ease: "easeInOut",
})

// A small idle motion per condition: the sun turns, clouds drift, rain bobs, lightning flickers.
const motionFor = (
  kind: WeatherKind,
  isDay: boolean
): { animate: TargetAndTransition; transition: Transition } => {
  switch (kind) {
    case "clear":
      return isDay
        ? {
            animate: { rotate: 360 },
            transition: { duration: 14, repeat: Infinity, ease: "linear" },
          }
        : { animate: { rotate: [-10, 10, -10] }, transition: loop(4) }
    case "partly":
    case "cloudy":
    case "fog":
      return { animate: { x: [-3, 3, -3] }, transition: loop(4) }
    case "drizzle":
    case "rain":
    case "snow":
      return { animate: { y: [0, 3, 0] }, transition: loop(1.6) }
    case "storm":
      return {
        animate: { opacity: [1, 0.35, 1, 1, 0.5, 1] },
        transition: { duration: 2.2, repeat: Infinity, ease: "linear" },
      }
  }
}

const iconFor = (kind: WeatherKind, isDay: boolean) => {
  const props = { className: "size-full", strokeWidth: 1.5 }
  switch (kind) {
    case "clear":
      return isDay ? <Sun {...props} /> : <Moon {...props} />
    case "partly":
      return isDay ? <CloudSun {...props} /> : <CloudMoon {...props} />
    case "cloudy":
      return <Cloud {...props} />
    case "fog":
      return <CloudFog {...props} />
    case "drizzle":
      return <CloudDrizzle {...props} />
    case "rain":
      return <CloudRain {...props} />
    case "snow":
      return <CloudSnow {...props} />
    case "storm":
      return <CloudLightning {...props} />
  }
}

const WeatherIcon = ({
  kind,
  isDay,
  className,
}: {
  kind: WeatherKind
  isDay: boolean
  className?: string
}) => {
  const { animate, transition } = motionFor(kind, isDay)

  return (
    <motion.span
      aria-hidden
      className={cn("inline-block", className)}
      animate={animate}
      transition={transition}
    >
      {iconFor(kind, isDay)}
    </motion.span>
  )
}

export default WeatherIcon

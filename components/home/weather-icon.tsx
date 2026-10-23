"use client"

import React from "react"
import { motion, TargetAndTransition, Transition } from "motion/react"

import Icon from "@/components/home/icon"
import type { IconName } from "@/lib/icons"
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

const iconFor = (kind: WeatherKind, isDay: boolean): IconName => {
  switch (kind) {
    case "clear":
      return isDay ? "sun" : "moon"
    case "partly":
      return isDay ? "sunCloud" : "moonCloud"
    case "cloudy":
      return "cloud"
    case "fog":
      return "fog"
    case "drizzle":
      return "drizzle"
    case "rain":
      return "rain"
    case "snow":
      return "snow"
    case "storm":
      return "storm"
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
      <Icon
        name={iconFor(kind, isDay)}
        className="size-full"
        strokeWidth={1.5}
      />
    </motion.span>
  )
}

export default WeatherIcon

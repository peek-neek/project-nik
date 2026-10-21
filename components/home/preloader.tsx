"use client"

import React, { useEffect, useState } from "react"
import { useLenis } from "lenis/react"
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react"

import Clock from "@/components/home/clock"
import { useIntro } from "@/components/home/intro-context"
import WeatherIcon from "@/components/home/weather-icon"
import { easeInOutQuart, easeOutExpo } from "@/lib/motion"
import { site } from "@/lib/site"
import type { Weather } from "@/lib/weather"

const rise = (delay: number) => ({
  initial: { y: "110%" },
  animate: { y: "0%" },
  transition: { duration: 0.9, ease: easeOutExpo, delay },
})

const Preloader = ({ weather }: { weather: Weather | null }) => {
  const { setReady } = useIntro()
  const [done, setDone] = useState(false)
  const count = useMotionValue(0)
  const percent = useTransform(() => `${Math.round(count.get())}`)
  const progress = useTransform(count, [0, 100], [0, 1])

  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    root.style.overflow = "hidden"

    const controls = animate(count, 100, {
      duration: reduce ? 0 : 1.8,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        root.style.overflow = ""
        setDone(true)
        setReady(true)
      },
    })

    return () => {
      controls.stop()
      root.style.overflow = ""
    }
  }, [count, setReady])

  const lenis = useLenis()

  useEffect(() => {
    if (done) return
    lenis?.stop()
    return () => lenis?.start()
  }, [done, lenis])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-9999 flex flex-col justify-between bg-paper px-4 pt-6 pb-4 text-ink md:px-6 lg:px-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: easeInOutQuart }}
        >
          <div className="flex justify-between font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase">
            <span>{site.name}©</span>
            <span>Portfolio</span>
          </div>
          {weather && (
            <div className="flex flex-col gap-3">
              <div className="overflow-hidden">
                <motion.div className="flex items-center gap-4" {...rise(0.15)}>
                  <WeatherIcon
                    kind={weather.kind}
                    isDay={weather.isDay}
                    className="size-[clamp(2.75rem,5vw,4.5rem)]"
                  />
                  <span className="font-display text-[clamp(4.5rem,10vw,9rem)] leading-[0.85] tabular-nums">
                    {weather.temperature}
                    {weather.unit}
                  </span>
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  className="font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase"
                  {...rise(0.3)}
                >
                  {weather.condition} in {site.location.code} · <Clock />
                </motion.p>
              </div>
            </div>
          )}
          <div>
            <div className="flex items-end justify-between">
              <span className="pb-[2vw] font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase">
                LOADING
              </span>
              <span className="font-display text-[24vw] leading-[0.8] tabular-nums">
                <motion.span>{percent}</motion.span>%
              </span>
            </div>
            <motion.div
              className="mt-4 h-1.5 origin-left bg-current"
              style={{ scaleX: progress }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader

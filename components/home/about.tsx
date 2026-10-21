"use client"

import React, { Fragment, useEffect, useRef } from "react"
import {
  animate,
  motion,
  MotionValue,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react"

import Link from "next/link"

import { FadeIn, Label, parseRich } from "@/components/home/primitives"
import { easeOutExpo } from "@/lib/motion"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const splitWords = (text: string) =>
  parseRich(text).flatMap((part) =>
    part.text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ text: word, serif: part.serif }))
  )

const Word = ({
  progress,
  range,
  serif,
  children,
}: {
  progress: MotionValue<number>
  range: [number, number]
  serif: boolean
  children: string
}) => {
  const opacity = useTransform(progress, range, [0.12, 1])

  return (
    <motion.span
      style={{ opacity }}
      className={cn(
        serif &&
          "font-serif text-[1.08em] leading-none tracking-[-0.01em] italic"
      )}
    >
      {children}
    </motion.span>
  )
}

export const Statement = ({ text }: { text: string }) => {
  const words = splitWords(text)
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  })

  return (
    <p
      ref={ref}
      className="text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.06] font-medium tracking-[-0.035em]"
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <Word
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            serif={word.serif}
          >
            {word.text}
          </Word>{" "}
        </Fragment>
      ))}
    </p>
  )
}

export const Stat = ({
  value,
  suffix,
  label,
}: {
  value: number
  suffix: string
  label: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const count = useMotionValue(0)
  const rounded = useTransform(() => Math.round(count.get()))

  useEffect(() => {
    if (!inView) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const controls = animate(count, value, {
      duration: reduce ? 0 : 2,
      ease: easeOutExpo,
    })
    return () => controls.stop()
  }, [inView, count, value])

  return (
    <div ref={ref} className="border-t border-line pt-4">
      <p className="font-display text-[clamp(4.5rem,9vw,8rem)] leading-[0.85] tabular-nums">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </p>
      <Label className="mt-3">{label}</Label>
    </div>
  )
}

const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-8 px-4 py-24 md:px-6 md:py-36 lg:px-8"
    >
      <div className="grid gap-8 md:grid-cols-12">
        <Label className="md:col-span-3">(01) About</Label>
        <div className="md:col-span-9">
          <Statement text={site.statement} />
        </div>
      </div>

      <div className="mt-20 grid gap-10 md:mt-32 md:grid-cols-12">
        <div className="space-y-5 text-lg leading-relaxed text-ink-soft md:col-span-5 md:col-start-4">
          {site.bio.map((paragraph, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <p>{paragraph}</p>
            </FadeIn>
          ))}
          <FadeIn delay={0.2}>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 pt-2 font-mono text-xs font-medium tracking-[0.12em] text-ink uppercase"
            >
              More about me
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </FadeIn>
        </div>
      </div>

      <div className="mt-20 grid gap-8 sm:grid-cols-3 md:mt-28">
        {site.stats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}

export default About

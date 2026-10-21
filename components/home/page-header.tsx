"use client"

import React from "react"
import { motion, Variants } from "motion/react"

import { useIntro } from "@/components/home/intro-context"
import { Label, RichText } from "@/components/home/primitives"
import Wordmark from "@/components/home/wordmark"
import { easeOutExpo } from "@/lib/motion"

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: easeOutExpo, delay },
  }),
}

const PageHeader = ({
  title,
  label,
  headline,
  meta,
  titleClassName = "text-[clamp(7rem,26vw,28rem)]",
}: {
  title: string
  label: string
  headline: string
  meta: string
  titleClassName?: string
}) => {
  const { ready } = useIntro()
  const state = ready ? "show" : "hidden"

  return (
    <section className="px-4 pt-32 pb-20 md:px-6 md:pt-40 md:pb-28 lg:px-8">
      <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
        <Wordmark
          text={title}
          label={title}
          state={state}
          fit={false}
          className={titleClassName}
        />
        <motion.div
          className="pb-3"
          initial="hidden"
          animate={state}
          variants={fade}
          custom={0.5}
        >
          <Label>{label}</Label>
        </motion.div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-12">
        <motion.p
          className="text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.035em] md:col-span-8"
          initial="hidden"
          animate={state}
          variants={fade}
          custom={0.6}
        >
          <RichText text={headline} />
        </motion.p>
        <motion.div
          className="md:col-span-4 md:pt-3 md:text-right"
          initial="hidden"
          animate={state}
          variants={fade}
          custom={0.7}
        >
          <Label>{meta}</Label>
        </motion.div>
      </div>
    </section>
  )
}

export default PageHeader

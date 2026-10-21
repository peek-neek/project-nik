"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, Variants } from "motion/react"

import { useIntro } from "@/components/home/intro-context"
import { Label, Serif } from "@/components/home/primitives"
import Wordmark from "@/components/home/wordmark"
import { easeOutExpo } from "@/lib/motion"
import { site } from "@/lib/site"

const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: easeOutExpo, delay },
  }),
}

const Hero = () => {
  const { ready } = useIntro()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"])
  const bottomY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"])
  const state = ready ? "show" : "hidden"

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-4 pt-24 pb-6 md:px-6 md:pt-28 md:pb-8 lg:px-8"
    >
      <motion.div
        className="flex items-start justify-between gap-6"
        initial="hidden"
        animate={state}
        variants={fade}
        custom={0.5}
      >
        <Label>{site.role}</Label>
        <Label className="text-right">
          Portfolio ©{new Date().getFullYear()}
        </Label>
      </motion.div>

      <motion.div style={{ y: wordmarkY }} className="relative">
        <Wordmark text={site.wordmark} label={site.name} state={state} />
      </motion.div>

      <motion.div
        style={{ y: bottomY }}
        className="grid grid-cols-2 items-end gap-6 md:grid-cols-3"
      >
        <motion.p
          className="max-w-[22ch] text-[clamp(1.35rem,2vw,2rem)] leading-[1.12] tracking-[-0.03em]"
          initial="hidden"
          animate={state}
          variants={fade}
          custom={0.6}
        >
          {site.intro} <Serif>{site.location.city}</Serif>
        </motion.p>

        <motion.a
          href="#about"
          className="hidden flex-col items-center gap-2 justify-self-center md:flex"
          initial="hidden"
          animate={state}
          variants={fade}
          custom={0.75}
        >
          <Label>Scroll</Label>
          <span className="relative block h-10 w-1.5 overflow-hidden rounded-full bg-line">
            <motion.span
              className="absolute inset-x-0 top-0 block h-1/2 bg-ink"
              animate={{ y: ["-100%", "200%"] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </span>
        </motion.a>

        <motion.p
          className="justify-self-end text-right text-[clamp(1.35rem,2vw,2rem)] leading-[1.12] tracking-[-0.03em]"
          initial="hidden"
          animate={state}
          variants={fade}
          custom={0.7}
        >
          {site.availability.label}
          <br />
          <Serif>{site.availability.period}</Serif>
        </motion.p>
      </motion.div>
    </section>
  )
}

export default Hero

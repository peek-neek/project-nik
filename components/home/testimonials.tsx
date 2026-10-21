"use client"

import React, { useState } from "react"
import { AnimatePresence, motion, Variants } from "motion/react"

import { Label } from "@/components/home/primitives"
import { easeOutExpo } from "@/lib/motion"
import { site } from "@/lib/site"

const slide: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction >= 0 ? 48 : -48,
    filter: "blur(8px)",
  }),
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction >= 0 ? -48 : 48,
    filter: "blur(8px)",
  }),
}

const digit: Variants = {
  enter: (direction: number) => ({ y: direction >= 0 ? "100%" : "-100%" }),
  center: { y: 0 },
  exit: (direction: number) => ({ y: direction >= 0 ? "-100%" : "100%" }),
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)

const pad = (value: number) => String(value).padStart(2, "0")

const Testimonials = () => {
  const items = site.testimonials
  const [[index, direction], setState] = useState([0, 0])
  const item = items[index]

  const paginate = (step: number) =>
    setState(([current]) => [
      (current + step + items.length) % items.length,
      step,
    ])

  if (items.length === 0) return null

  return (
    <section className="px-4 pb-24 md:px-6 md:pb-36 lg:px-8">
      <div className="grid gap-10 border-t border-line pt-8 md:grid-cols-12">
        <div className="flex flex-col justify-between gap-8 md:col-span-3">
          <div>
            <Label>(04) Kind words</Label>
            <p className="mt-4 flex font-display text-7xl leading-[0.85] tabular-nums md:text-8xl">
              <span className="relative block overflow-hidden">
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                >
                  <motion.span
                    key={index}
                    className="block"
                    custom={direction}
                    variants={digit}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.6, ease: easeOutExpo }}
                  >
                    {pad(index + 1)}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="text-ink-soft">
                &nbsp;/&nbsp;{pad(items.length)}
              </span>
            </p>
          </div>

          <div className="flex gap-3">
            {[
              { step: -1, label: "Previous testimonial", glyph: "←" },
              { step: 1, label: "Next testimonial", glyph: "→" },
            ].map((control) => (
              <motion.button
                key={control.step}
                type="button"
                aria-label={control.label}
                onClick={() => paginate(control.step)}
                className="grid size-14 place-items-center rounded-full border border-line text-xl transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  bounce: 0.3,
                  visualDuration: 0.25,
                }}
              >
                {control.glyph}
              </motion.button>
            ))}
          </div>
        </div>

        <div
          className="relative min-h-[22rem] md:col-span-9 md:min-h-[26rem]"
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.figure
              key={index}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: easeOutExpo }}
              className="flex h-full flex-col justify-between gap-10"
            >
              <blockquote className="text-[clamp(1.75rem,3.8vw,3.5rem)] leading-[1.06] font-medium tracking-[-0.035em]">
                <span className="font-serif font-normal italic">“</span>
                {item.quote}
                <span className="font-serif font-normal italic">”</span>
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-full bg-brand font-mono text-sm text-on-brand">
                  {initials(item.name)}
                </span>
                <span>
                  <span className="block text-lg font-medium">{item.name}</span>
                  <Label>{item.role}</Label>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

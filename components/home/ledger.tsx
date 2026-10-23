"use client"

import React from "react"
import { motion, Variants } from "motion/react"

import Icon from "@/components/home/icon"
import { Label, RichText } from "@/components/home/primitives"
import type { IconName } from "@/lib/icons"
import { easeOutExpo } from "@/lib/motion"

const fill: Variants = {
  rest: { scaleY: 0 },
  hover: { scaleY: 1 },
}

const nudge: Variants = {
  rest: { x: 0 },
  hover: { x: 16 },
}

type Row = { primary: string; secondary: string; meta: string }

// A numbered list (FAQ) whose rows fill with the brand colour on hover.
const Ledger = ({
  label,
  heading,
  rows,
  icon,
}: {
  label: string
  heading: string
  rows: Row[]
  /** Optional icon shown before every row's name. */
  icon?: IconName
}) => (
  <section className="px-4 pb-24 md:px-6 md:pb-36 lg:px-8">
    <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-12">
      <Label className="md:col-span-3">{label}</Label>
      <h2 className="text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.035em] md:col-span-8">
        <RichText text={heading} />
      </h2>
    </div>

    <ul className="border-t border-line">
      {rows.map((row, i) => (
        <motion.li
          key={`${row.primary}-${i}`}
          className="group relative overflow-hidden border-b border-line"
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <motion.div
            className="absolute inset-0 origin-bottom bg-brand"
            variants={fill}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          />
          <motion.div
            className="relative grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-5 transition-colors duration-300 group-hover:text-on-brand md:grid-cols-12 md:py-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: i * 0.04 }}
          >
            <span className="font-mono text-xs tracking-[0.12em] md:col-span-1 md:pl-2">
              {String(i + 1).padStart(2, "0")}
            </span>
            <motion.span
              className="flex items-center gap-[0.2em] font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.85] uppercase md:col-span-5"
              variants={nudge}
              transition={{ type: "spring", bounce: 0.2, visualDuration: 0.4 }}
            >
              {icon && (
                <Icon name={icon} className="size-[0.55em]" strokeWidth={1.5} />
              )}
              {row.primary}
            </motion.span>
            <span className="col-start-2 text-lg leading-snug md:col-span-4 md:col-start-7">
              <RichText text={row.secondary} />
            </span>
            <span className="row-start-1 justify-self-end font-mono text-xs tracking-[0.12em] md:col-span-2 md:col-start-11 md:row-start-auto md:pr-2 md:text-right">
              {row.meta}
            </span>
          </motion.div>
        </motion.li>
      ))}
    </ul>
  </section>
)

export default Ledger

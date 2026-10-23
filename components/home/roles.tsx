"use client"

import React, { Fragment } from "react"
import { motion, Variants } from "motion/react"

import Icon from "@/components/home/icon"
import { easeOutExpo } from "@/lib/motion"
import { site } from "@/lib/site"

// Each icon has its own little hover move: the pen scribbles, the code pulses, the rocket lifts off.
const hovers: Record<string, Variants["hover"]> = {
  design: { rotate: [0, -18, 12, -6, 0], transition: { duration: 0.6 } },
  develop: { scale: [1, 1.3, 0.95, 1], transition: { duration: 0.5 } },
  deploy: { x: [0, 3, -1, 0], y: [0, -4, 1, 0], transition: { duration: 0.6 } },
}

const pop = (i: number): Variants => ({
  hidden: { scale: 0, rotate: -90 },
  show: {
    scale: 1,
    rotate: 0,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.5,
      visualDuration: 0.5,
      delay: 0.7 + i * 0.12,
    },
  },
})

// "I [pen] Design, [code] Develop & [rocket] Deploy", for the top of the hero.
const Roles = ({ state }: { state: "hidden" | "show" }) => (
  <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-[0.6875rem] font-medium tracking-[0.12em] text-ink-soft uppercase">
    <span>I</span>
    {site.roles.map((role, i) => {
      const hover = hovers[role.icon]
      return (
        <Fragment key={role.label}>
          {i > 0 && (
            <span aria-hidden={i < site.roles.length - 1}>
              {i === site.roles.length - 1 ? "&" : ","}
            </span>
          )}
          <motion.span
            className="inline-flex items-center gap-1.5 text-ink"
            initial="hidden"
            animate={state}
            whileHover="hover"
          >
            <motion.span
              aria-hidden
              className="inline-block size-3.5"
              variants={{ ...pop(i), hover }}
              transition={{ ease: easeOutExpo }}
            >
              <Icon name={role.icon} className="size-full" />
            </motion.span>
            {role.label}
          </motion.span>
        </Fragment>
      )
    })}
  </p>
)

export default Roles

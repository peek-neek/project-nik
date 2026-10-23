"use client"

import React from "react"
import { motion, Variants } from "motion/react"

import Icon from "@/components/home/icon"
import { Reveal, RichText, Serif } from "@/components/home/primitives"
import ToolLogo, { hasToolLogo } from "@/components/home/tool-logo"
import { easeOutExpo } from "@/lib/motion"
import { site } from "@/lib/site"

const fill: Variants = {
  rest: { scaleY: 0 },
  hover: { scaleY: 1 },
}

const nameOut: Variants = {
  rest: { y: "0%" },
  hover: { y: "-110%" },
}

const roleIn: Variants = {
  rest: { y: "110%" },
  hover: { y: "0%" },
}

// Which of my products use a tool, e.g. "CarrelAI · Kardably".
const usedIn = (tool: string) => {
  const products = site.projects
    .filter((project) => project.stack.includes(tool))
    .map((project) => project.title)
  return products.length > 0 ? products.join(" · ") : "In my toolkit"
}

// "Built with" grid: each tile fills with the brand colour on hover and the tool's name
// rolls away to reveal what it does. Underneath, the products that use it.
const BuiltWith = ({ heading }: { heading: string }) => (
  <section className="px-4 pb-24 md:px-6 md:pb-36 lg:px-8">
    <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <h2 className="font-display text-[clamp(4.5rem,10vw,10rem)] leading-[0.8] uppercase">
        <Reveal>Built with</Reveal>
      </h2>
      <p className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.04] font-medium tracking-[-0.035em] md:pb-1 md:text-right">
        <RichText text={heading} />
      </p>
    </div>

    <ul className="grid grid-cols-2 border-t border-l border-line md:grid-cols-3">
      {site.stack.map((tool, i) => (
        <motion.li
          key={tool.name}
          className="group relative flex min-h-44 flex-col justify-between overflow-hidden border-r border-b border-line p-4 md:aspect-2/1 md:min-h-0 md:p-7"
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <motion.div
            className="absolute inset-0 origin-bottom bg-brand"
            variants={fill}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          />

          <motion.div
            className="relative flex h-full flex-col justify-between gap-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: i * 0.05 }}
          >
            <span className="font-mono text-xs font-medium tracking-[0.12em] text-ink-soft transition-colors duration-300 group-hover:text-on-brand/70">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div>
              <span className="flex items-center gap-[0.45em] text-[clamp(1.25rem,2.2vw,2rem)] leading-[1.15] font-medium tracking-[-0.03em]">
                {hasToolLogo(tool.name) ? (
                  <ToolLogo
                    name={tool.name}
                    className="size-[0.85em] transition-colors duration-300 group-hover:text-on-brand"
                  />
                ) : (
                  <Icon
                    name={tool.icon}
                    className="size-[0.9em] transition-colors duration-300 group-hover:text-on-brand"
                    strokeWidth={1.5}
                  />
                )}
                <span className="relative block flex-1 overflow-hidden">
                  <motion.span
                    className="block py-[0.05em]"
                    variants={nameOut}
                    transition={{ duration: 0.55, ease: easeOutExpo }}
                  >
                    {tool.name}
                  </motion.span>
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 flex items-center text-on-brand"
                    variants={roleIn}
                    transition={{ duration: 0.55, ease: easeOutExpo }}
                  >
                    <Serif>{tool.role}</Serif>
                  </motion.span>
                </span>
              </span>
              <span className="sr-only">, {tool.role}. </span>
              <span className="mt-2 block font-mono text-[0.6875rem] tracking-[0.12em] text-ink-soft uppercase transition-colors duration-300 group-hover:text-on-brand/80">
                {usedIn(tool.name)}
              </span>
            </div>
          </motion.div>
        </motion.li>
      ))}
    </ul>
  </section>
)

export default BuiltWith

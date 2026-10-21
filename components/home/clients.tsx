"use client"

import React from "react"
import { motion, Variants } from "motion/react"

import { Reveal, RichText, Serif } from "@/components/home/primitives"
import { easeOutExpo } from "@/lib/motion"

const fill: Variants = {
  rest: { scaleY: 0 },
  hover: { scaleY: 1 },
}

const nameOut: Variants = {
  rest: { y: "0%" },
  hover: { y: "-110%" },
}

const detailIn: Variants = {
  rest: { y: "110%" },
  hover: { y: "0%" },
}

type Client = { name: string; work: string; year: string }

// "Trusted by" grid: each cell fills with the brand colour on hover and its name rolls
// away to reveal the kind of work and the year.
const Clients = ({
  heading,
  clients,
}: {
  heading: string
  clients: Client[]
}) => (
  <section className="px-4 pb-24 md:px-6 md:pb-36 lg:px-8">
    <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <h2 className="font-display text-[clamp(4.5rem,10vw,10rem)] leading-[0.8] uppercase">
        <Reveal>Trusted by</Reveal>
      </h2>
      <p className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.04] font-medium tracking-[-0.035em] md:pb-1 md:text-right">
        <RichText text={heading} />
      </p>
    </div>

    <ul className="grid grid-cols-2 border-t border-l border-line md:grid-cols-4">
      {clients.map((client, i) => (
        <motion.li
          key={`${client.name}-${i}`}
          className="group relative flex min-h-44 flex-col justify-between overflow-hidden border-r border-b border-line p-4 md:aspect-8/5 md:min-h-0 md:p-7"
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
              <span className="relative block overflow-hidden text-[clamp(1.25rem,2.2vw,2rem)] leading-[1.15] font-medium tracking-[-0.03em]">
                <motion.span
                  className="block py-[0.05em]"
                  variants={nameOut}
                  transition={{ duration: 0.55, ease: easeOutExpo }}
                >
                  {client.name}
                </motion.span>
                <motion.span
                  aria-hidden
                  className="absolute inset-0 flex items-center text-on-brand"
                  variants={detailIn}
                  transition={{ duration: 0.55, ease: easeOutExpo }}
                >
                  <Serif>{client.work}</Serif>, {client.year}
                </motion.span>
              </span>
              <span className="mt-1 block font-mono text-[0.6875rem] tracking-[0.12em] text-ink-soft uppercase md:sr-only">
                {client.work}, {client.year}
              </span>
            </div>
          </motion.div>
        </motion.li>
      ))}
    </ul>
  </section>
)

export default Clients

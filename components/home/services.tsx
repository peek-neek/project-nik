"use client"

import React from "react"
import { motion, Variants } from "motion/react"

import { Label, RichText } from "@/components/home/primitives"
import { easeOutExpo } from "@/lib/motion"
import { site } from "@/lib/site"

const fill: Variants = {
  rest: { scaleY: 0 },
  hover: { scaleY: 1 },
}

const nudge: Variants = {
  rest: { x: 0 },
  hover: { x: 16 },
}

const Services = ({
  heading = "I take products from a first idea to a live business: *think it, design it, build it, ship it, keep it running.*",
}: {
  heading?: string
}) => {
  return (
    <section className="px-4 pb-24 md:px-6 md:pb-36 lg:px-8">
      <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-12">
        <Label className="md:col-span-3">(03) Capabilities</Label>
        <p className="text-[clamp(1.35rem,2vw,2rem)] leading-[1.12] tracking-[-0.03em] md:col-span-6">
          <RichText text={heading} />
        </p>
      </div>

      <ul className="border-t border-line">
        {site.services.map((service, i) => (
          <motion.li
            key={service.title}
            className="group relative overflow-hidden border-b border-line"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div
              className="absolute inset-0 origin-bottom bg-brand"
              variants={fill}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            />
            <motion.div
              className="relative grid grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-2 py-6 transition-colors duration-300 group-hover:text-on-brand md:grid-cols-12 md:py-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: i * 0.06 }}
            >
              <span className="font-mono text-xs tracking-[0.12em] md:col-span-1 md:pl-2">
                0{i + 1}
              </span>
              <motion.h3
                className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.85] uppercase md:col-span-6"
                variants={nudge}
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  visualDuration: 0.4,
                }}
              >
                {service.title}
              </motion.h3>
              <p className="col-start-2 max-w-[38ch] text-lg leading-snug md:col-span-4 md:col-start-8">
                {service.description}
              </p>
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

export default Services

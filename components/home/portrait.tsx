"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"

import { Label } from "@/components/home/primitives"
import { site } from "@/lib/site"

const Portrait = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1])
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])

  return (
    <figure>
      <motion.div
        ref={ref}
        className="relative aspect-4/5 overflow-hidden rounded-2xl bg-tint"
        initial={{ clipPath: "inset(100% 0% 0% 0% round 16px)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 16px)" }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div className="absolute inset-0" style={{ scale, y }}>
          {site.about.portrait ? (
            <Image
              src={site.about.portrait}
              alt={`Portrait of ${site.name}`}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="@container grid size-full place-items-center">
              <span className="font-display text-[110cqw] leading-[0.8] text-brand uppercase">
                {site.name[0]}
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>
      <figcaption className="mt-4 flex items-baseline justify-between gap-4">
        <span className="text-xl font-medium tracking-[-0.02em]">
          {site.name}
        </span>
        <Label>{site.location.city}</Label>
      </figcaption>
    </figure>
  )
}

export default Portrait

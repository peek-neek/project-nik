"use client"

import React, { ReactNode } from "react"
import { motion } from "motion/react"

import { easeOutExpo } from "@/lib/motion"
import { cn } from "@/lib/utils"

export const Label = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <p
    className={cn(
      "font-mono text-[0.6875rem] font-medium tracking-[0.12em] text-ink-soft uppercase",
      className
    )}
  >
    {children}
  </p>
)

export const Serif = ({ children }: { children: ReactNode }) => (
  <span className="font-serif text-[1.08em] leading-none font-normal tracking-[-0.01em] italic">
    {children}
  </span>
)

// Splits "plain *serif* plain" into segments so copy in lib/site.ts can mark serif words.
export const parseRich = (text: string) =>
  text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*")
        ? { text: part.slice(1, -1), serif: true }
        : { text: part, serif: false }
    )

export const RichText = ({ text }: { text: string }) => (
  <>
    {parseRich(text).map((part, i) =>
      part.serif ? <Serif key={i}>{part.text}</Serif> : part.text
    )}
  </>
)

// Masks its children and slides them up into view the first time they scroll in.
export const Reveal = ({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) => (
  <span className={cn("block overflow-hidden pt-[0.06em]", className)}>
    <motion.span
      className="block"
      initial={{ y: "105%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.span>
  </span>
)

export const FadeIn = ({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    transition={{ duration: 0.9, ease: easeOutExpo, delay }}
  >
    {children}
  </motion.div>
)

"use client"

import React, { CSSProperties, ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import type { ShapeType } from "@/lib/site"
import { cn } from "@/lib/utils"

// Builds a star polygon in a 100×100 box: `points` tips alternating between the outer and inner radius.
const starPath = (points: number, outer: number, inner: number) => {
  let d = ""
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outer : inner
    const angle = ((-90 + (i * 180) / points) * Math.PI) / 180
    const x = (50 + radius * Math.cos(angle)).toFixed(2)
    const y = (50 + radius * Math.sin(angle)).toFixed(2)
    d += `${i === 0 ? "M" : "L"}${x} ${y}`
  }
  return `${d}Z`
}

const burst = starPath(16, 49, 20)
const star = starPath(8, 49, 21)
const smiley = starPath(6, 44, 27)

const face = { fill: "var(--shape-face, #fff)" }

const art: Record<ShapeType, ReactNode> = {
  flower: (
    <>
      <circle cx="50" cy="27" r="23" />
      <circle cx="73" cy="50" r="23" />
      <circle cx="50" cy="73" r="23" />
      <circle cx="27" cy="50" r="23" />
      <circle cx="50" cy="50" r="22" />
    </>
  ),
  blossom: (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="25"
          rx="12"
          ry="24"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="12" />
    </>
  ),
  burst: <path d={burst} />,
  star: <path d={star} />,
  smiley: (
    <>
      <path
        d={smiley}
        stroke="currentColor"
        strokeWidth="9"
        strokeLinejoin="round"
      />
      <circle cx="41" cy="45" r="3.4" style={face} />
      <circle cx="59" cy="45" r="3.4" style={face} />
      <path
        d="M37 55 Q50 68 63 55"
        fill="none"
        style={{ stroke: "var(--shape-face, #fff)" }}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </>
  ),
  sparkle: (
    <path d="M50 0C54 36 64 46 100 50C64 54 54 64 50 100C46 64 36 54 0 50C36 46 46 36 50 0Z" />
  ),
}

export type ShapeProps = {
  type: ShapeType
  /** Width and height. A number is pixels; a string can be any CSS length, e.g. "4vw" or "clamp(2rem,5vw,5rem)". */
  size?: number | string
  color?: string
  rotate?: number
  /** Seconds per full turn of a slow idle spin. 0 turns it off. */
  spin?: number
  /** How strongly the shape drifts and turns as the page scrolls. 0 turns it off. */
  parallax?: number
  /** Wiggles on hover. Interactive shapes catch the pointer, so keep them clear of links. */
  interactive?: boolean
  delay?: number
  className?: string
  style?: CSSProperties
}

const Shape = ({
  type,
  size = 48,
  color = "var(--brand)",
  rotate = 0,
  spin = 0,
  parallax = 0,
  interactive = false,
  delay = 0,
  className,
  style,
}: ShapeProps) => {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const depth = reduce ? 0 : parallax
  const y = useTransform(scrollY, [0, 4000], [0, depth * -400], {
    clamp: false,
  })
  const scrollRotate = useTransform(scrollY, [0, 4000], [0, depth * 240], {
    clamp: false,
  })

  return (
    <motion.span
      aria-hidden
      className={cn(
        "block",
        interactive ? "pointer-events-auto" : "pointer-events-none",
        className
      )}
      style={{ width: size, height: size, y, rotate: scrollRotate, ...style }}
    >
      <motion.span
        className="block size-full"
        initial={{ scale: 0, rotate: rotate - 90 }}
        whileInView={{ scale: 1, rotate }}
        viewport={{ once: true, margin: "0px 0px -5% 0px" }}
        whileHover={
          interactive ? { scale: 1.25, rotate: rotate + 25 } : undefined
        }
        whileTap={interactive ? { scale: 0.9 } : undefined}
        transition={{
          type: "spring",
          bounce: 0.55,
          visualDuration: 0.6,
          delay,
        }}
      >
        <motion.svg
          viewBox="0 0 100 100"
          className="block size-full overflow-visible"
          style={{ color }}
          fill="currentColor"
          animate={spin ? { rotate: 360 } : undefined}
          transition={
            spin
              ? { duration: spin, repeat: Infinity, ease: "linear" }
              : undefined
          }
        >
          {art[type]}
        </motion.svg>
      </motion.span>
    </motion.span>
  )
}

export default Shape

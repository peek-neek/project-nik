"use client"

import React, { PointerEvent, RefObject, useEffect, useRef } from "react"
import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  Variants,
} from "motion/react"

import { easeOutExpo } from "@/lib/motion"
import { cn } from "@/lib/utils"

// How much the letter under the pointer grows, and how far (in em) the ripple reaches either side.
const STRETCH = 0.24
const REACH = 1.1
const OFFSCREEN = -1e5

const ripple = { stiffness: 160, damping: 13, mass: 0.7 }

const rise: Variants = {
  hidden: { y: "105%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 1.3, ease: easeOutExpo, delay: 0.05 + i * 0.07 },
  }),
}

const Letter = ({
  char,
  index,
  state,
  pointerX,
  fontSize,
  centers,
  letterRef,
}: {
  char: string
  index: number
  state: "hidden" | "show"
  pointerX: MotionValue<number>
  fontSize: MotionValue<number>
  centers: RefObject<number[]>
  letterRef: (el: HTMLSpanElement | null) => void
}) => {
  const target = useTransform(() => {
    const reach = fontSize.get() * REACH
    const distance = Math.abs(
      pointerX.get() - (centers.current[index] ?? OFFSCREEN)
    )
    if (distance >= reach) return 1
    return 1 + (STRETCH * (Math.cos((Math.PI * distance) / reach) + 1)) / 2
  })
  const scaleY = useSpring(target, ripple)

  return (
    <span
      ref={letterRef}
      aria-hidden
      className="block [clip-path:inset(-60%_-10%_0_-10%)]"
    >
      <motion.span
        className="block origin-bottom"
        style={{ scaleY }}
        initial="hidden"
        animate={state}
        variants={rise}
        custom={index}
      >
        {char === " " ? " " : char}
      </motion.span>
    </span>
  )
}

const Wordmark = ({
  text,
  label,
  state,
  fit = true,
  className,
}: {
  text: string
  label: string
  state: "hidden" | "show"
  /** Scale the type to run edge to edge. Turn off to size it with `className` instead. */
  fit?: boolean
  className?: string
}) => {
  const reduce = useReducedMotion()
  const box = useRef<HTMLHeadingElement>(null)
  const row = useRef<HTMLSpanElement>(null)
  const letters = useRef<(HTMLSpanElement | null)[]>([])
  const centers = useRef<number[]>([])
  const pointerX = useMotionValue(OFFSCREEN)
  const fontSize = useMotionValue(0)
  const chars = [...text, ""]

  // Scale the type so the word runs edge to edge, capped so it never outgrows the viewport height.
  useEffect(() => {
    const measure = () => {
      if (!box.current || !row.current) return
      const current = parseFloat(getComputedStyle(row.current).fontSize)
      if (fit) {
        const next = Math.min(
          (current * box.current.clientWidth) / row.current.scrollWidth,
          window.innerHeight * 0.75
        )
        row.current.style.fontSize = `${next}px`
        fontSize.set(next)
      } else {
        fontSize.set(current)
      }
      centers.current = letters.current.map((el) =>
        el ? el.offsetLeft + el.offsetWidth / 2 : OFFSCREEN
      )
    }

    measure()
    document.fonts.ready.then(measure)
    const observer = new ResizeObserver(measure)
    if (box.current) observer.observe(box.current)

    return () => observer.disconnect()
  }, [fit, fontSize])

  const onPointerMove = (event: PointerEvent<HTMLHeadingElement>) => {
    if (reduce || event.pointerType !== "mouse" || !row.current) return
    pointerX.set(event.clientX - row.current.getBoundingClientRect().left)
  }

  return (
    <h1
      ref={box}
      aria-label={label}
      onPointerMove={onPointerMove}
      onPointerLeave={() => pointerX.set(OFFSCREEN)}
      className={cn(
        "flex pt-[0.2em] font-display leading-[0.8] uppercase select-none",
        fit && "justify-center"
      )}
    >
      <span
        ref={row}
        className={cn(
          "relative flex items-end whitespace-nowrap",
          fit ? "text-[min(30vw,60svh)]" : className
        )}
      >
        {chars.map((char, i) => (
          <Letter
            key={i}
            char={char}
            index={i}
            state={state}
            pointerX={pointerX}
            fontSize={fontSize}
            centers={centers}
            letterRef={(el) => {
              letters.current[i] = el
            }}
          />
        ))}
      </span>
    </h1>
  )
}

export default Wordmark

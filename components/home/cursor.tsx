"use client"

import React, { useEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react"

const follow = { stiffness: 500, damping: 40, mass: 0.5 }

// A "View" bubble that follows the pointer over anything marked with data-cursor.
const Cursor = () => {
  const [label, setLabel] = useState<string | null>(null)
  const pointerX = useMotionValue(-200)
  const pointerY = useMotionValue(-200)
  const x = useSpring(pointerX, follow)
  const y = useSpring(pointerY, follow)

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
    }

    const onOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      const target = (event.target as Element).closest?.("[data-cursor]")
      setLabel(target?.getAttribute("data-cursor") ?? null)
    }

    const onLeave = () => setLabel(null)

    window.addEventListener("pointermove", onMove)
    document.addEventListener("pointerover", onOver)
    document.documentElement.addEventListener("pointerleave", onLeave)

    return () => {
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerover", onOver)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [pointerX, pointerY])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-9000 hidden [@media(pointer:fine)]:block"
      style={{ x, y }}
    >
      <AnimatePresence>
        {label && (
          <motion.div
            key="label"
            className="grid size-28 -translate-1/2 place-items-center rounded-full bg-brand font-display text-2xl tracking-[0.04em] text-on-brand uppercase"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", bounce: 0.3, visualDuration: 0.35 }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Cursor

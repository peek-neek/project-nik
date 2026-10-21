"use client"

import React, { MouseEvent, useState } from "react"
import { useLenis } from "lenis/react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import CanadaFlag from "@/components/home/canada-flag"
import Clock from "@/components/home/clock"
import { useIntro } from "@/components/home/intro-context"
import { useMenu } from "@/components/home/menu-context"
import { easeOutExpo, scrollEasing } from "@/lib/motion"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

// The centre cluster is drawn twice from the same markup so the pieces line up exactly:
// the text inside the colour-inverting header, the flag in an unblended layer on top
// (inside the blended header its red would come out cyan).
const LocalTime = ({ layer }: { layer: "text" | "flag" }) => (
  <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase md:flex">
    {layer === "flag" ? (
      <CanadaFlag className="h-[11px] w-[22px]" />
    ) : (
      <span className="h-[11px] w-[22px]" />
    )}
    <span className={cn(layer === "flag" && "invisible")}>
      {site.location.code}
    </span>
    <span className={cn(layer === "flag" && "invisible")}>
      <Clock />
    </span>
  </div>
)

const Header = () => {
  const { ready } = useIntro()
  const { open, toggle, close, triggerRef } = useMenu()
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const lenis = useLenis()
  const pathname = usePathname()

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(y > previous && y > 160)
  })

  const goHome = (event: MouseEvent<HTMLAnchorElement>) => {
    if (open) {
      event.preventDefault()
      close("/")
    } else if (pathname === "/") {
      event.preventDefault()
      lenis?.scrollTo(0, { duration: 1.4, easing: scrollEasing })
    }
  }

  const visible = ready && (open || !hidden)
  const slide = {
    initial: { y: "-100%" },
    animate: { y: visible ? 0 : "-100%" },
    transition: { duration: 0.7, ease: easeOutExpo },
  }

  return (
    <>
      <motion.header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-1000",
          open ? "text-on-brand" : "text-nav mix-blend-difference"
        )}
        {...slide}
      >
        <div className="relative flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
          <Link
            href="/"
            onClick={goHome}
            className="pointer-events-auto font-display text-[2.5rem] leading-[0.8] tracking-[0.04em] uppercase"
          >
            {site.wordmark}
          </Link>

          <LocalTime layer="text" />

          <motion.button
            ref={triggerRef}
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "pointer-events-auto relative grid size-13 place-items-center rounded-full border transition-colors duration-500",
              open
                ? "border-on-brand bg-on-brand text-brand"
                : "border-current bg-transparent"
            )}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", bounce: 0.3, visualDuration: 0.3 }}
          >
            <motion.span
              className="absolute h-[1.5px] w-[1.1rem] bg-current"
              initial={false}
              animate={open ? { y: 0, rotate: 45 } : { y: -3, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.25, visualDuration: 0.4 }}
            />
            <motion.span
              className="absolute h-[1.5px] w-[1.1rem] bg-current"
              initial={false}
              animate={open ? { y: 0, rotate: -45 } : { y: 3, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.25, visualDuration: 0.4 }}
            />
          </motion.button>
        </div>
      </motion.header>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-1000"
        {...slide}
      >
        <div className="relative flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
          <LocalTime layer="flag" />
        </div>
      </motion.div>
    </>
  )
}

export default Header

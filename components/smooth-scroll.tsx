"use client"

import * as React from "react"
import { ReactLenis, type LenisRef } from "lenis/react"
import { cancelFrame, frame, type FrameData } from "motion/react"

import { scrollEasing } from "@/lib/motion"

function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = React.useRef<LenisRef>(null)

  // Drive Lenis from Motion's frame loop so scroll and animations share one rAF.
  React.useEffect(() => {
    function update({ timestamp }: FrameData) {
      lenisRef.current?.lenis?.raf(timestamp)
    }

    frame.update(update, true)

    return () => cancelFrame(update)
  }, [])

  React.useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const link = (event.target as Element).closest?.<HTMLAnchorElement>(
        'a[href^="#"]'
      )
      const lenis = lenisRef.current?.lenis

      if (!link || !lenis) {
        return
      }

      const hash = link.getAttribute("href") ?? "#"
      const target =
        hash === "#"
          ? 0
          : document.getElementById(decodeURIComponent(hash.slice(1)))

      if (target === null) {
        return
      }

      event.preventDefault()
      // The menu stops Lenis while open; restart it so the scroll isn't cancelled when the menu closes.
      lenis.start()
      lenis.scrollTo(target, { duration: 1.4, easing: scrollEasing })
      history.pushState(null, "", hash)
    }

    document.addEventListener("click", onClick)

    return () => document.removeEventListener("click", onClick)
  }, [])

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.09 }}>
      {children}
    </ReactLenis>
  )
}

export { SmoothScroll }

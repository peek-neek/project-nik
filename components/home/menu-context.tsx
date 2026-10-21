"use client"

import React, {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useLenis } from "lenis/react"
import { animate, useReducedMotion } from "motion/react"
import { usePathname, useRouter } from "next/navigation"

import { easeInOutQuart, scrollEasing } from "@/lib/motion"

type MenuState = {
  open: boolean
  toggle: () => void
  close: (href?: string) => void
  shellRef: RefObject<HTMLDivElement | null>
  innerRef: RefObject<HTMLDivElement | null>
  spacerRef: RefObject<HTMLDivElement | null>
  triggerRef: RefObject<HTMLButtonElement | null>
}

const MenuContext = createContext<MenuState | null>(null)

// Where the window sits while the menu is open: scaled evenly from its centre and pushed right.
const frameFor = () => {
  const vw = window.innerWidth
  return vw < 768
    ? { scale: 0.78, x: vw * 0.66, y: 0, radius: 20 }
    : { scale: 0.72, x: vw * 0.14, y: 0, radius: 32 }
}

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const shellRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const scrollTop = useRef(0)
  const pending = useRef(false)
  const run = useRef(0)
  const lenis = useLenis()
  const reduce = useReducedMotion()
  const router = useRouter()
  const pathname = usePathname()

  const duration = reduce ? 0 : 0.9

  const expand = useCallback(() => {
    const shell = shellRef.current
    const inner = innerRef.current
    const spacer = spacerRef.current
    if (!shell || !inner || !spacer) return
    run.current++

    const top = window.scrollY
    const frame = frameFor()
    scrollTop.current = top
    lenis?.stop()

    // Pin the page as a window-sized box showing what's on screen. The spacer keeps the
    // document height, so the scroll position (and every scroll-linked animation) stays put.
    spacer.style.height = `${shell.offsetHeight}px`
    shell.style.position = "fixed"
    shell.style.inset = "0"
    shell.style.overflow = "hidden"
    inner.style.transform = `translateY(${-top}px)`

    animate(
      shell,
      {
        scale: frame.scale,
        x: frame.x,
        y: frame.y,
        borderRadius: frame.radius / frame.scale,
      },
      { duration, ease: easeInOutQuart }
    )
    setOpen(true)
  }, [duration, lenis])

  const collapse = useCallback(
    async (top: number) => {
      const shell = shellRef.current
      const inner = innerRef.current
      const spacer = spacerRef.current
      if (!shell || !inner || !spacer) return
      const current = ++run.current

      inner.style.transform = `translateY(${-top}px)`
      await animate(
        shell,
        { scale: 1, x: 0, y: 0, borderRadius: 0 },
        { duration: duration * 0.9, ease: easeInOutQuart }
      )
      if (current !== run.current) return

      shell.style.position = ""
      shell.style.inset = ""
      shell.style.overflow = ""
      inner.style.transform = ""
      spacer.style.height = ""
      lenis?.start()
      if (Math.abs(window.scrollY - top) > 1) {
        if (lenis) lenis.scrollTo(top, { immediate: true, force: true })
        else window.scrollTo({ top, behavior: "instant" })
      }
      triggerRef.current?.focus({ preventScroll: true })
    },
    [duration, lenis]
  )

  const close = useCallback(
    (href?: string) => {
      setOpen(false)

      if (href?.startsWith("#")) {
        collapse(scrollTop.current).then(() => {
          const target = document.getElementById(href.slice(1))
          if (target)
            lenis?.scrollTo(target, { duration: 1.4, easing: scrollEasing })
        })
        return
      }

      if (href && href !== pathname) {
        pending.current = true
        router.push(href, { scroll: false })
        return
      }

      collapse(scrollTop.current)
    },
    [collapse, lenis, pathname, router]
  )

  // Once the new route has rendered inside the frame, show its top and zoom back out.
  useEffect(() => {
    if (!pending.current) return
    pending.current = false

    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo({ top: 0, behavior: "instant" })
    collapse(0)
  }, [pathname, collapse, lenis])

  const toggle = useCallback(() => {
    if (open) close()
    else expand()
  }, [open, close, expand])

  const value = useMemo(
    () => ({ open, toggle, close, shellRef, innerRef, spacerRef, triggerRef }),
    [open, toggle, close]
  )

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (!context) throw new Error("useMenu must be used inside MenuProvider")
  return context
}

// Wraps everything that should shrink into the frame when the menu opens.
export const PageShell = ({ children }: { children: ReactNode }) => {
  const { open, shellRef, innerRef, spacerRef } = useMenu()

  return (
    <>
      <div ref={shellRef} inert={open} className="relative z-6 bg-paper">
        <div ref={innerRef}>{children}</div>
      </div>
      <div ref={spacerRef} aria-hidden />
    </>
  )
}

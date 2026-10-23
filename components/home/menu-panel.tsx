"use client"

import React, { MouseEvent, useEffect, useRef } from "react"
import { AnimatePresence, motion, Variants } from "motion/react"
import { usePathname } from "next/navigation"

import Icon from "@/components/home/icon"
import { useMenu } from "@/components/home/menu-context"
import { easeOutExpo } from "@/lib/motion"
import { site } from "@/lib/site"

// Each link drives its children through named states ("rest" → "shown", plus "hover").
// Children must not set their own initial/animate labels, or they stop following the link.
const linkIn: Variants = {
  rest: { y: "110%" },
  shown: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: easeOutExpo, delay: 0.3 + i * 0.07 },
  }),
}

// The uppercase label slides out the top while the italic copy slides up into the same box.
// The box has room below the line so descenders (the "j" in "projects") aren't clipped.
const rollOut: Variants = {
  rest: { y: "0%" },
  hover: { y: "-120%" },
}

const rollIn: Variants = {
  rest: { y: "100%" },
  hover: { y: "0%" },
}

// The zig-zag is revealed by a mask sweeping left to right. (Animating pathLength left
// stray dots at the ends, because the stroke doesn't scale with the stretched SVG.)
const HIDDEN = "inset(-60% 100% -60% 0%)"
const SHOWN = "inset(-60% 0% -60% 0%)"

const draw: Variants = {
  rest: { clipPath: HIDDEN },
  hover: { clipPath: SHOWN },
}

// A hand-drawn zig-zag about as wide as the label: three teeth per letter.
const zigzag = (label: string) => {
  const teeth = label.length * 3
  let d = "M1 9"
  for (let i = 1; i <= teeth; i++) d += ` L${i * 8 + 1} ${i % 2 ? 3 : 9}`
  return { d, width: teeth * 8 + 2 }
}

const MenuPanel = () => {
  const { open, close } = useMenu()
  const pathname = usePathname()
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    firstLink.current?.focus({ preventScroll: true })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    window.addEventListener("keydown", onKeyDown)

    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, close])

  const onNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    close(href)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu"
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="theme-inverse fixed inset-0 z-5"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.8, duration: 0 } }}
        >
          <nav className="flex h-full w-[70%] flex-col justify-between px-4 pt-28 pb-20 md:w-[28vw] md:px-6 md:pb-24 lg:px-8">
            <ul className="my-auto flex flex-col gap-3">
              {site.nav.map((item, i) => {
                const active = item.href === pathname
                const line = zigzag(item.label)
                return (
                  <li key={item.href} className="overflow-hidden">
                    <motion.a
                      ref={i === 0 ? firstLink : undefined}
                      href={item.href}
                      onClick={(event) => onNavigate(event, item.href)}
                      aria-current={active ? "page" : undefined}
                      whileHover="hover"
                      whileFocus="hover"
                      className="flex w-fit items-start gap-[0.18em] pb-[0.12em] font-display text-[clamp(3.5rem,6vw,7rem)] leading-[0.9] uppercase outline-none"
                      variants={linkIn}
                      custom={i}
                      initial="rest"
                      animate="shown"
                      exit={{ y: "110%", transition: { duration: 0.35 } }}
                    >
                      <Icon
                        name={item.icon}
                        className="mt-[0.3em] size-[0.42em]"
                        strokeWidth={1.5}
                      />
                      <span className="inline-flex flex-col items-stretch">
                        <span className="relative block overflow-hidden pt-[0.04em] pb-[0.16em]">
                          <motion.span
                            className="block"
                            variants={rollOut}
                            transition={{ duration: 0.5, ease: easeOutExpo }}
                          >
                            {item.label}
                          </motion.span>
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 flex items-center pt-[0.04em] font-serif text-[0.86em] leading-[1.15] normal-case italic"
                            variants={rollIn}
                            transition={{ duration: 0.5, ease: easeOutExpo }}
                          >
                            {item.label}
                          </motion.span>
                        </span>
                        <motion.span
                          aria-hidden
                          className="relative block h-[0.12em] w-full"
                          variants={draw}
                          animate={active ? { clipPath: SHOWN } : undefined}
                          transition={{
                            duration: 0.7,
                            ease: easeOutExpo,
                            delay: active ? 0.45 + i * 0.07 : 0,
                          }}
                        >
                          <svg
                            viewBox={`0 0 ${line.width} 12`}
                            preserveAspectRatio="none"
                            className="absolute inset-0 size-full overflow-visible"
                          >
                            <path
                              d={line.d}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={3}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </motion.span>
                      </span>
                    </motion.a>
                  </li>
                )
              })}
            </ul>

            <motion.ul
              className="space-y-2 font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.55 }}
            >
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 hover:opacity-60"
                >
                  <Icon name="mail" className="size-3.5" />
                  {site.email}
                </a>
              </li>
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:opacity-60"
                  >
                    <Icon name={social.icon} className="size-3.5" />
                    {social.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          </nav>
        </motion.div>
      )}
      {open && (
        <button
          key="frame-hit"
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={() => close()}
          className="fixed inset-y-0 right-0 z-7 w-[23%] cursor-pointer md:w-[72%]"
        />
      )}
    </AnimatePresence>
  )
}

export default MenuPanel

"use client"

import React, { MouseEvent, useEffect, useRef } from "react"
import { AnimatePresence, motion, Variants } from "motion/react"
import { usePathname } from "next/navigation"

import { useMenu } from "@/components/home/menu-context"
import { easeOutExpo } from "@/lib/motion"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const roll: Variants = {
  hover: { y: "-100%" },
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
                return (
                  <li key={item.href} className="overflow-hidden">
                    <motion.a
                      ref={i === 0 ? firstLink : undefined}
                      href={item.href}
                      onClick={(event) => onNavigate(event, item.href)}
                      aria-current={active ? "page" : undefined}
                      whileHover="hover"
                      whileFocus="hover"
                      className="flex items-center gap-3 font-display text-[clamp(3.5rem,6vw,7rem)] leading-[0.9] uppercase outline-none"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%", transition: { duration: 0.35 } }}
                      transition={{
                        duration: 0.9,
                        ease: easeOutExpo,
                        delay: 0.3 + i * 0.07,
                      }}
                    >
                      <span className="relative block overflow-hidden pt-[0.04em]">
                        <motion.span
                          className="block"
                          variants={roll}
                          transition={{ duration: 0.5, ease: easeOutExpo }}
                        >
                          {item.label}
                        </motion.span>
                        <motion.span
                          aria-hidden
                          className="absolute inset-x-0 top-full block pt-[0.04em] font-serif text-[0.86em] normal-case italic"
                          variants={roll}
                          transition={{ duration: 0.5, ease: easeOutExpo }}
                        >
                          {item.label}
                        </motion.span>
                      </span>
                      <span
                        className={cn(
                          "size-2.5 rounded-full bg-current transition-opacity",
                          active ? "opacity-100" : "opacity-0"
                        )}
                      />
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
                <a href={`mailto:${site.email}`} className="hover:opacity-60">
                  {site.email}
                </a>
              </li>
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:opacity-60"
                  >
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

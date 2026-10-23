"use client"

import React, { useSyncExternalStore } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useTheme } from "next-themes"

import Icon from "@/components/home/icon"
import { useIntro } from "@/components/home/intro-context"
import { easeOutExpo } from "@/lib/motion"

const accents = [
  { id: "blue", label: "Royal blue", color: "#1f3dff" },
  { id: "red", label: "Red", color: "#e3191c" },
  { id: "green", label: "Green", color: "#0f7f35" },
  { id: "yellow", label: "Yellow", color: "#f5c518" },
  { id: "violet", label: "Violet", color: "#6b1eff" },
  { id: "black", label: "Black", color: "#0a0a0a" },
]

const listeners = new Set<() => void>()

const subscribe = (onChange: () => void) => {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

const getAccent = () => document.documentElement.dataset.accent ?? "blue"

const setAccent = (id: string) => {
  if (id === "blue") delete document.documentElement.dataset.accent
  else document.documentElement.dataset.accent = id
  try {
    localStorage.setItem("accent", id)
  } catch {}
  listeners.forEach((listener) => listener())
}

const noop = () => () => {}

const AccentSwitcher = () => {
  const { ready } = useIntro()
  const accent = useSyncExternalStore(subscribe, getAccent, () => null)
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false
  )
  const { resolvedTheme, setTheme } = useTheme()
  const dark = mounted && resolvedTheme === "dark"

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-900 flex items-center gap-1 rounded-full border border-line bg-paper/70 p-1.5 text-ink backdrop-blur-xl backdrop-saturate-150 md:bottom-6 md:left-6"
      initial={{ opacity: 0, y: 24 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.9 }}
    >
      {accents.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-label={item.label}
          aria-pressed={accent === item.id}
          onClick={() => setAccent(item.id)}
          className="relative grid size-7 place-items-center rounded-full"
        >
          {accent === item.id && (
            <motion.span
              layoutId="accent-ring"
              className="absolute inset-0 rounded-full border border-ink"
              transition={{
                type: "spring",
                bounce: 0.25,
                visualDuration: 0.35,
              }}
            />
          )}
          <motion.span
            className="size-3.5 rounded-full ring-1 ring-line"
            style={{ backgroundColor: item.color }}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.85 }}
          />
        </button>
      ))}
      <span className="mx-1 h-4 w-px bg-line" />
      <button
        type="button"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setTheme(dark ? "light" : "dark")}
        className="relative grid size-7 place-items-center overflow-hidden rounded-full"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={dark ? "moon" : "sun"}
            initial={{ y: 14, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -14, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
          >
            <Icon name={dark ? "moon" : "sun"} className="size-4" />
          </motion.span>
        </AnimatePresence>
      </button>
    </motion.div>
  )
}

export default AccentSwitcher

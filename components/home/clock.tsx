"use client"

import React, { useSyncExternalStore } from "react"

import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const format = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: site.location.timeZone,
})

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 1000)
  return () => window.clearInterval(id)
}

const Clock = ({ className }: { className?: string }) => {
  const time = useSyncExternalStore(
    subscribe,
    () => format.format(Date.now()),
    () => "00:00:00"
  )

  return <span className={cn("tabular-nums", className)}>{time}</span>
}

export default Clock

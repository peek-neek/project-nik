"use client"

import * as React from "react"
import { MotionConfig } from "motion/react"

function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

export { MotionProvider }

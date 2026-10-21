import React from "react"

import Shape from "@/components/home/shape"
import { site, type ShapeType } from "@/lib/site"
import { cn } from "@/lib/utils"

type FieldConfig = typeof site.decorations

// Seeded PRNG so the server and browser place shapes identically, and a seed change reshuffles them.
const mulberry32 = (seed: number) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const scatter = ({
  seed,
  count,
  size,
  shapes,
  colors,
  edgeBias,
}: FieldConfig) => {
  const random = mulberry32(seed)
  const pick = <T,>(list: readonly T[]) =>
    list[Math.floor(random() * list.length)]

  // One shape per horizontal band keeps them spread down the page instead of clumping.
  return Array.from({ length: count }, (_, i) => {
    const nearEdge = random() < edgeBias
    const left = nearEdge
      ? random() < 0.5
        ? 1 + random() * 18
        : 81 + random() * 16
      : 4 + random() * 90
    const top = ((i + 0.15 + random() * 0.7) / count) * 100
    const type = pick(shapes) as ShapeType

    return {
      type,
      left,
      top,
      size: Math.round(size.min + random() * (size.max - size.min)),
      color: pick(colors),
      rotate: Math.round(random() * 360),
      spin: random() < 0.35 ? 18 + Math.round(random() * 24) : 0,
      parallax: 0.2 + random() * 0.8,
    }
  })
}

const ShapeField = ({
  className,
  ...overrides
}: Partial<FieldConfig> & { className?: string }) => {
  const items = scatter({ ...site.decorations, ...overrides })

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-20 overflow-hidden",
        className
      )}
    >
      {items.map((item, i) => (
        <Shape
          key={i}
          type={item.type}
          size={item.size}
          color={item.color}
          rotate={item.rotate}
          spin={item.spin}
          parallax={item.parallax}
          className="absolute -translate-1/2"
          style={{ left: `${item.left}%`, top: `${item.top}%` }}
        />
      ))}
    </div>
  )
}

export default ShapeField

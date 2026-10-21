import React from "react"
import Image from "next/image"

import type { Motif, Project } from "@/lib/site"
import { cn } from "@/lib/utils"

const Art = ({ motif }: { motif: Motif }) => {
  switch (motif) {
    case "orb":
      return (
        <div className="absolute top-1/2 left-1/2 size-[68cqw] -translate-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--brand)_55%,white),var(--brand)_60%)]" />
      )
    case "grid":
      return (
        <div className="absolute inset-0 bg-[radial-gradient(var(--brand)_1.4px,transparent_1.6px)] bg-[size:6cqw_6cqw] opacity-50" />
      )
    case "arch":
      return (
        <div className="absolute bottom-0 left-1/2 h-[78%] w-[58%] -translate-x-1/2 rounded-t-full bg-brand" />
      )
    case "rings":
      return (
        <div className="absolute top-1/2 left-1/2 size-[90cqw] -translate-1/2 rounded-full bg-[repeating-radial-gradient(circle,var(--brand)_0_2px,transparent_2px_5cqw)] opacity-80" />
      )
    case "stripes":
      return (
        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,var(--brand)_0_3cqw,transparent_3cqw_6cqw)]" />
      )
    case "bars":
      return (
        <div className="absolute inset-x-[8%] bottom-0 flex h-[70%] items-end gap-[2cqw]">
          {[45, 70, 55, 90, 65, 100, 80].map((height, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-[1.5cqw] bg-brand"
              style={{ height: `${height}%`, opacity: 0.35 + i * 0.1 }}
            />
          ))}
        </div>
      )
  }
}

const titleStyle: Record<Motif, string> = {
  orb: "inset-0 grid place-items-center text-on-brand",
  grid: "inset-x-[6cqw] bottom-[5cqw] text-ink",
  arch: "inset-x-0 bottom-[8cqw] text-center text-on-brand",
  rings:
    "inset-0 grid place-items-center text-ink [&>span]:bg-tint [&>span]:px-[3cqw]",
  stripes:
    "inset-0 grid place-items-center text-ink [&>span]:bg-tint [&>span]:px-[3cqw] [&>span]:pt-[1cqw]",
  bars: "top-[6cqw] left-[6cqw] text-ink",
}

const ProjectCover = ({
  project,
  className,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  project: Project
  className?: string
  sizes?: string
}) => {
  if (project.image) {
    return (
      <div className={cn("relative overflow-hidden bg-tint", className)}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={cn("@container relative overflow-hidden bg-tint", className)}
    >
      <Art motif={project.motif} />
      <div className={cn("absolute", titleStyle[project.motif])}>
        <span className="block font-display text-[16cqw] leading-[0.85] uppercase">
          {project.title}
        </span>
      </div>
    </div>
  )
}

export default ProjectCover

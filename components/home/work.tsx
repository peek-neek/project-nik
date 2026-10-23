import React from "react"

import Icon from "@/components/home/icon"
import { FadeIn, Label, Reveal } from "@/components/home/primitives"
import WorkCard from "@/components/home/work-card"
import { site, type ProjectKind } from "@/lib/site"

export const WorkGrid = ({ kind }: { kind?: ProjectKind }) => (
  <div className="grid gap-x-5 gap-y-14 md:grid-cols-2">
    {site.projects
      .filter((project) => !kind || project.kind === kind)
      .map((project, i) => (
        <WorkCard key={project.slug} project={project} index={i} />
      ))}
  </div>
)

// My own products first, then client work, each with a short header.
export const ProjectGroups = () => (
  <div className="flex flex-col gap-24 md:gap-32">
    {site.projectGroups.map((group) => {
      const count = site.projects.filter((p) => p.kind === group.kind).length
      if (count === 0) return null

      return (
        <section key={group.kind} aria-labelledby={`group-${group.kind}`}>
          <FadeIn className="mb-8 flex flex-col gap-3 border-b border-line pb-5 md:mb-10 md:flex-row md:items-end md:justify-between">
            <h3
              id={`group-${group.kind}`}
              className="flex items-center gap-3 text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-medium tracking-[-0.035em]"
            >
              <Icon name={group.icon} className="size-[0.8em]" />
              {group.title}
              <span className="font-serif font-normal text-ink-soft italic">
                ({String(count).padStart(2, "0")})
              </span>
            </h3>
            <p className="text-lg text-ink-soft">{group.description}</p>
          </FadeIn>
          <WorkGrid kind={group.kind} />
        </section>
      )
    })}
  </div>
)

const Work = () => {
  const count = String(site.projects.length).padStart(2, "0")

  return (
    <section
      id="projects"
      className="scroll-mt-8 px-4 pb-24 md:px-6 md:pb-36 lg:px-8"
    >
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-line pb-6 md:mb-14">
        <h2 className="font-display text-[clamp(4.5rem,16vw,17rem)] leading-[0.8] uppercase">
          <Reveal>Projects</Reveal>
        </h2>
        <div className="pb-2 text-right">
          <Label>(02) Selected projects</Label>
          <p className="mt-2 font-serif text-4xl italic md:text-5xl">
            ({count})
          </p>
        </div>
      </div>

      <ProjectGroups />
    </section>
  )
}

export default Work

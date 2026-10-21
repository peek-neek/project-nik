import React from "react"

import { Label, Reveal } from "@/components/home/primitives"
import WorkCard from "@/components/home/work-card"
import { site } from "@/lib/site"

export const WorkGrid = () => (
  <div className="grid gap-x-5 gap-y-14 md:grid-cols-2">
    {site.projects.map((project, i) => (
      <WorkCard key={project.slug} project={project} index={i} />
    ))}
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

      <WorkGrid />
    </section>
  )
}

export default Work

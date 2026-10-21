import type { Metadata } from "next"

import PageHeader from "@/components/home/page-header"
import { WorkGrid } from "@/components/home/work"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: `Projects — ${site.name}`,
  description: `Products designed and built by ${site.name}: ${site.projects
    .map((project) => project.title)
    .join(", ")}.`,
}

export default function ProjectsPage() {
  const years = site.projects.map((project) => Number(project.year))
  const first = Math.min(...years)
  const last = Math.max(...years)
  const count = String(site.projects.length).padStart(2, "0")

  return (
    <>
      <PageHeader
        title="Projects"
        label={`(${count}) Products`}
        headline="SaaS products I've designed, built and *shipped myself.*"
        meta={first === last ? `${first}` : `${first} — ${last}`}
        titleClassName="text-[clamp(4.5rem,19vw,22rem)]"
      />

      <section className="px-4 pb-24 md:px-6 md:pb-36 lg:px-8">
        <WorkGrid />
      </section>
    </>
  )
}

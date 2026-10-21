import type { Metadata } from "next"

import { Stat, Statement } from "@/components/home/about"
import Clients from "@/components/home/clients"
import Ledger from "@/components/home/ledger"
import PageHeader from "@/components/home/page-header"
import Portrait from "@/components/home/portrait"
import { FadeIn, Label, RichText } from "@/components/home/primitives"
import Services from "@/components/home/services"
import Testimonials from "@/components/home/testimonials"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: `${site.about.disciplines}. ${site.intro} ${site.location.city}.`,
}

export default function AboutPage() {
  const { about } = site

  return (
    <>
      <PageHeader
        title="About"
        label="(00) Profile"
        headline={about.headline}
        meta={about.disciplines}
      />

      <section className="px-4 pb-24 md:px-6 md:pb-36 lg:px-8">
        <div className="grid gap-8 md:grid-cols-12">
          <Label className="md:col-span-3">(01) Intro</Label>
          <div className="md:col-span-9">
            <Statement text={about.intro} />
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 md:px-6 md:pb-36 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <Portrait />
          </div>
          <div className="flex flex-col justify-between gap-12 md:col-span-6 md:col-start-7">
            <div>
              <Label className="mb-6">(02) Story</Label>
              <FadeIn>
                <h2 className="text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.035em]">
                  <RichText text={about.bioHeading} />
                </h2>
              </FadeIn>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
                {about.bio.map((paragraph, i) => (
                  <FadeIn key={i} delay={0.1 + i * 0.1}>
                    <p>
                      <RichText text={paragraph} />
                    </p>
                  </FadeIn>
                ))}
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {site.stats.map((stat) => (
                <Stat key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Services heading={about.servicesHeading} />

      <Clients heading={about.clientsHeading} clients={about.clients} />

      <Ledger
        label="(05) Recognition"
        heading={about.awardsHeading}
        rows={about.awards.map((award) => ({
          primary: award.name,
          secondary: award.title,
          meta: award.year,
        }))}
      />

      <Testimonials />
    </>
  )
}

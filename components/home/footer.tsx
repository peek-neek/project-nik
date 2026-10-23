"use client"

import React, { PointerEvent, useEffect, useRef, useState } from "react"
import { useLenis } from "lenis/react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "motion/react"

import Icon from "@/components/home/icon"
import Clock from "@/components/home/clock"
import { Label, RichText } from "@/components/home/primitives"
import ProjectCover from "@/components/home/project-cover"
import { easeOutExpo, scrollEasing } from "@/lib/motion"
import { site } from "@/lib/site"

// The display email slides fully out the top while the serif copy slides in from below.
// Padding lives inside each span so tall glyphs (and descenders) travel with their box.
const rollOut: Variants = {
  rest: { y: "0%" },
  // Past -100% because descenders like "y" hang below the line box.
  hover: { y: "-150%" },
}

const rollIn: Variants = {
  rest: { y: "100%" },
  hover: { y: "0%" },
}

const follow = { stiffness: 260, damping: 28, mass: 0.6 }

// Largest the email may grow on very wide screens, in px.
const EMAIL_MAX = 260

const Footer = () => {
  const ref = useRef<HTMLElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const lenis = useLenis()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"])

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const previewX = useSpring(pointerX, follow)
  const previewY = useSpring(pointerY, follow)

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set(event.clientX - rect.left + 24)
    pointerY.set(event.clientY - rect.top - 120)
  }

  // Size the email (and its serif hover copy) to fill the row on one line at any screen width.
  const emailRef = useRef<HTMLAnchorElement>(null)
  const emailFit = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const fit = () => {
      const width = emailRef.current?.clientWidth
      if (!width) return
      for (const el of emailFit.current) {
        if (!el) continue
        const current = parseFloat(getComputedStyle(el).fontSize)
        const next = Math.min((current * width) / el.offsetWidth, EMAIL_MAX)
        el.style.fontSize = `${next}px`
      }
    }

    fit()
    document.fonts.ready.then(fit)
    const observer = new ResizeObserver(fit)
    if (emailRef.current) observer.observe(emailRef.current)

    return () => observer.disconnect()
  }, [])

  const project = site.projects.find((item) => item.slug === preview)

  return (
    <footer
      id="contact"
      ref={ref}
      onPointerMove={onPointerMove}
      className="theme-tint relative overflow-hidden"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-20 hidden w-56 md:block"
        style={{ x: previewX, y: previewY }}
      >
        <AnimatePresence>
          {project && (
            <motion.div
              key={project.slug}
              className="absolute inset-x-0 top-0 aspect-3/4 overflow-hidden rounded-lg shadow-2xl"
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 6 }}
              transition={{
                type: "spring",
                bounce: 0.25,
                visualDuration: 0.35,
              }}
            >
              <div className="h-full [--paper:#ffffff] [--tint:color-mix(in_oklab,var(--brand)_7%,white)]">
                <ProjectCover
                  project={project}
                  className="h-full"
                  sizes="14rem"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        style={{ y }}
        className="flex min-h-svh flex-col justify-between gap-16 px-4 pt-28 pb-6 md:px-6 md:pb-8 lg:px-8"
      >
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Label className="mb-5">(05) Contact</Label>
            <p className="max-w-[16ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.035em]">
              <RichText text="Have a project in mind? *Let's make it memorable.*" />
            </p>
          </div>

          <div className="md:col-span-3">
            <Label className="mb-5 flex items-center gap-2">
              <Icon name="projects" className="size-3.5" /> Projects
            </Label>
            <ul
              className="space-y-1 text-xl"
              onPointerLeave={() => setPreview(null)}
            >
              {site.projects.map((item) => (
                <li key={item.slug}>
                  <a
                    href={item.href ?? "/projects"}
                    {...(item.href?.startsWith("http") && {
                      target: "_blank",
                      rel: "noreferrer",
                    })}
                    onPointerEnter={() => setPreview(item.slug)}
                    className="inline-block transition-opacity duration-300 hover:opacity-60"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <Label className="mb-5 flex items-center gap-2">
              <Icon name="user" className="size-3.5" /> Connect
            </Label>
            <ul className="space-y-1 text-xl">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2"
                  >
                    <Icon name={social.icon} className="size-5" />
                    {social.label}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <Icon name="arrowUpRight" className="size-4" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative">
          <Label className="mb-4 flex items-center gap-2">
            <Icon name="mail" className="size-3.5" /> Say hello
          </Label>
          <motion.a
            ref={emailRef}
            href={`mailto:${site.email}`}
            className="relative block overflow-hidden font-display text-[clamp(2.5rem,10vw,13rem)] leading-[0.85] whitespace-nowrap"
            initial="rest"
            animate="rest"
            whileHover="hover"
          >
            <motion.span
              ref={(el) => {
                emailFit.current[0] = el
              }}
              className="block w-max py-[0.1em]"
              variants={rollOut}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              {site.email}
            </motion.span>
            <motion.span
              aria-hidden
              className="absolute inset-0 flex items-center"
              variants={rollIn}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <span
                ref={(el) => {
                  emailFit.current[1] = el
                }}
                className="w-max font-serif text-[0.8em] italic"
              >
                {site.email}
              </span>
            </motion.span>
          </motion.a>
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-5 font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span className="flex items-center gap-3">
            <Icon name="maple" className="size-3.5" />
            {site.location.code} <Clock />
          </span>
          <motion.button
            type="button"
            onClick={() =>
              lenis
                ? lenis.scrollTo(0, { duration: 1.6, easing: scrollEasing })
                : window.scrollTo({ top: 0 })
            }
            className="inline-flex items-center gap-2 self-start uppercase sm:self-auto"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", bounce: 0.4, visualDuration: 0.3 }}
          >
            Back to top <Icon name="arrowUp" className="size-3.5" />
          </motion.button>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer

"use client"

import React, { PointerEvent } from "react"
import { motion, useMotionValue, useSpring, Variants } from "motion/react"

import Icon from "@/components/home/icon"
import { Label } from "@/components/home/primitives"
import ProjectCover from "@/components/home/project-cover"
import { easeOutExpo } from "@/lib/motion"
import type { Project } from "@/lib/site"

const cover: Variants = {
  hover: { scale: 1.06 },
}

const info: Variants = {
  rest: { clipPath: "inset(100% 0% 0% 0%)" },
  hover: { clipPath: "inset(0% 0% 0% 0%)" },
}

const infoItem: Variants = {
  rest: { opacity: 0, y: 24 },
  hover: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo, delay: 0.08 + i * 0.05 },
  }),
}

const arrow: Variants = {
  rest: { rotate: 0 },
  hover: { rotate: 45 },
}

const tilt = { stiffness: 180, damping: 22, mass: 0.6 }

const WorkCard = ({ project, index }: { project: Project; index: number }) => {
  const external = project.href?.startsWith("http") ?? false
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, tilt)
  const rotateY = useSpring(tiltY, tilt)

  const onPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse") return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    tiltX.set(py * -6)
    tiltY.set(px * 6)
  }

  const onPointerLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 1.1,
        ease: easeOutExpo,
        delay: (index % 2) * 0.12,
      }}
    >
      <motion.a
        href={project.href ?? "#projects"}
        {...(external && { target: "_blank", rel: "noreferrer" })}
        data-cursor={external ? "Visit" : "View"}
        className="block perspective-[1400px]"
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <motion.div
          className="relative aspect-20/19 overflow-hidden rounded-2xl bg-tint"
          style={{ rotateX, rotateY }}
        >
          <motion.div
            className="absolute inset-0"
            variants={cover}
            transition={{ duration: 1, ease: easeOutExpo }}
          >
            <ProjectCover project={project} className="absolute inset-0" />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex flex-col justify-between bg-tint p-6 text-ink md:p-7"
            variants={info}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <motion.div
              className="flex items-start justify-between gap-4"
              variants={infoItem}
              custom={0}
            >
              <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                {project.title}
              </h3>
              <motion.span
                className="text-3xl leading-none"
                variants={arrow}
                transition={{
                  type: "spring",
                  bounce: 0.3,
                  visualDuration: 0.4,
                }}
              >
                <Icon name="arrowUpRight" className="size-7" />
              </motion.span>
            </motion.div>

            <div>
              <motion.p
                className="font-display text-[clamp(4rem,8vw,8rem)] leading-[0.82]"
                variants={infoItem}
                custom={1}
              >
                {project.metric}
              </motion.p>
              <motion.div variants={infoItem} custom={2}>
                <Label className="mt-2">{project.metricLabel}</Label>
              </motion.div>
              <motion.p
                className="mt-5 max-w-[40ch] text-base leading-snug lg:text-lg"
                variants={infoItem}
                custom={3}
              >
                {project.summary}
              </motion.p>
              <motion.ul
                className="mt-5 flex flex-wrap gap-1.5"
                aria-label="Built with"
                variants={infoItem}
                custom={4}
              >
                {project.stack.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full bg-paper/60 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.06em]"
                  >
                    {tool}
                  </li>
                ))}
              </motion.ul>
              <motion.div
                className="mt-5 flex items-center justify-between gap-4"
                variants={infoItem}
                custom={5}
              >
                <span className="rounded-full border border-line px-3 py-1 font-mono text-[0.6875rem] tracking-[0.1em] uppercase">
                  {project.category}
                </span>
                <span className="font-mono text-[0.6875rem] tracking-[0.1em]">
                  {project.year}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-4 flex items-baseline justify-between gap-4">
          <p className="text-xl font-medium tracking-[-0.02em]">
            {project.title}
          </p>
          <Label>
            {project.category} — {project.year}
          </Label>
        </div>
      </motion.a>
    </motion.article>
  )
}

export default WorkCard

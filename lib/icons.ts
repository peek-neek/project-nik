import {
  Add01Icon,
  AiBrain01Icon,
  ApiIcon,
  ArrowLeft02Icon,
  ArrowRight02Icon,
  ArrowUp02Icon,
  ArrowUpRight01Icon,
  Briefcase01Icon,
  Calendar03Icon,
  CheckmarkBadge01Icon,
  CloudAngledRainIcon,
  CloudAngledZapIcon,
  CloudFogIcon,
  CloudIcon,
  CloudLittleRainIcon,
  CloudMidSnowIcon,
  ComponentIcon,
  DatabaseIcon,
  DribbbleIcon,
  GithubIcon,
  HelpCircleIcon,
  Idea01Icon,
  InstagramIcon,
  Layers01Icon,
  Linkedin01Icon,
  LockKeyIcon,
  Mail01Icon,
  Moon02Icon,
  MoonCloudIcon,
  Motion02Icon,
  PaintBoardIcon,
  PenTool03Icon,
  Rocket01Icon,
  ServerStack01Icon,
  SourceCodeIcon,
  Sun03Icon,
  SunCloud02Icon,
  TimeQuarterPassIcon,
  ToggleOnIcon,
  UserIcon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"

// Hugeicons has no maple leaf, so this is the Canadian flag's leaf redrawn on the same
// 24px grid with the same 1.5 stroke as the rest of the set.
const MapleLeafIcon: IconSvgElement = [
  [
    "path",
    {
      d: "M12.447 22l-0.223 -4.283a0.471 0.471 0 0 1 0.551 -0.486l4.263 0.749l-0.576 -1.588a0.323 0.323 0 0 1 0.099 -0.362l4.67 -3.782l-1.052 -0.491a0.323 0.323 0 0 1 -0.169 -0.392l0.923 -2.839l-2.69 0.571a0.323 0.323 0 0 1 -0.362 -0.189l-0.521 -1.226l-2.099 2.253a0.323 0.323 0 0 1 -0.551 -0.283l1.012 -5.221l-1.623 0.938a0.323 0.323 0 0 1 -0.452 -0.134l-1.648 -3.236l-1.648 3.236a0.323 0.323 0 0 1 -0.452 0.134l-1.623 -0.938l1.012 5.221a0.323 0.323 0 0 1 -0.551 0.283l-2.099 -2.253l-0.521 1.226a0.323 0.323 0 0 1 -0.362 0.189l-2.69 -0.571l0.923 2.839a0.323 0.323 0 0 1 -0.169 0.392l-1.052 0.491l4.67 3.782a0.323 0.323 0 0 1 0.099 0.362l-0.576 1.588l4.263 -0.749a0.471 0.471 0 0 1 0.551 0.486l-0.223 4.283Z",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinejoin: "round",
      strokeLinecap: "round",
      key: "0",
    },
  ],
]

// Every icon on the site, by name. Copy in lib/site.ts refers to these names.
export const icons = {
  maple: MapleLeafIcon,

  design: PenTool03Icon,
  develop: SourceCodeIcon,
  deploy: Rocket01Icon,

  idea: Idea01Icon,
  brand: PaintBoardIcon,
  ai: AiBrain01Icon,
  motion: Motion02Icon,
  maintain: Wrench01Icon,

  framework: Layers01Icon,
  database: DatabaseIcon,
  api: ApiIcon,
  state: ToggleOnIcon,
  components: ComponentIcon,
  jobs: TimeQuarterPassIcon,
  hosting: ServerStack01Icon,
  auth: LockKeyIcon,

  projects: Briefcase01Icon,
  about: UserIcon,
  mail: Mail01Icon,
  calendar: Calendar03Icon,
  plus: Add01Icon,
  help: HelpCircleIcon,
  user: UserIcon,
  check: CheckmarkBadge01Icon,

  linkedin: Linkedin01Icon,
  github: GithubIcon,
  instagram: InstagramIcon,
  dribbble: DribbbleIcon,

  arrowUpRight: ArrowUpRight01Icon,
  arrowUp: ArrowUp02Icon,
  arrowRight: ArrowRight02Icon,
  arrowLeft: ArrowLeft02Icon,

  sun: Sun03Icon,
  moon: Moon02Icon,
  sunCloud: SunCloud02Icon,
  moonCloud: MoonCloudIcon,
  cloud: CloudIcon,
  fog: CloudFogIcon,
  drizzle: CloudLittleRainIcon,
  rain: CloudAngledRainIcon,
  snow: CloudMidSnowIcon,
  storm: CloudAngledZapIcon,
} satisfies Record<string, IconSvgElement>

export type IconName = keyof typeof icons

import React from "react"
import { HugeiconsIcon } from "@hugeicons/react"

import { icons, type IconName } from "@/lib/icons"
import { cn } from "@/lib/utils"

// A Hugeicons icon sized to the surrounding text (1em) unless a size class says otherwise.
const Icon = ({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: IconName
  className?: string
  strokeWidth?: number
}) => (
  <HugeiconsIcon
    icon={icons[name]}
    size="1em"
    color="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden
    className={cn("inline-block shrink-0", className)}
  />
)

export default Icon

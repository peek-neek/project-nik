"use client"

import React, { createContext, ReactNode, useContext, useState } from "react"

type IntroState = {
  ready: boolean
  setReady: (ready: boolean) => void
}

const IntroContext = createContext<IntroState>({
  ready: true,
  setReady: () => {},
})

export const IntroProvider = ({ children }: { children: ReactNode }) => {
  const [ready, setReady] = useState(false)

  return (
    <IntroContext.Provider value={{ ready, setReady }}>
      {children}
    </IntroContext.Provider>
  )
}

export const useIntro = () => useContext(IntroContext)

import React, { ReactNode } from "react"

import AccentSwitcher from "@/components/home/accent-switcher"
import Cursor from "@/components/home/cursor"
import Footer from "@/components/home/footer"
import Header from "@/components/home/header"
import { IntroProvider } from "@/components/home/intro-context"
import { MenuProvider, PageShell } from "@/components/home/menu-context"
import MenuPanel from "@/components/home/menu-panel"
import Preloader from "@/components/home/preloader"
import { getWeather } from "@/lib/weather"

const HomepageLayout = async ({ children }: { children: ReactNode }) => {
  const weather = await getWeather()

  return (
    <IntroProvider>
      <MenuProvider>
        <Preloader weather={weather} />
        <Header />
        <MenuPanel />
        <PageShell>
          <main className="relative z-10 bg-paper">{children}</main>
          <Footer />
        </PageShell>
        <AccentSwitcher />
        <Cursor />
      </MenuProvider>
    </IntroProvider>
  )
}

export default HomepageLayout

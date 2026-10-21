import About from "@/components/home/about"
import Hero from "@/components/home/hero"
import Services from "@/components/home/services"
import Testimonials from "@/components/home/testimonials"
import Work from "@/components/home/work"

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Services />
      <Testimonials />
    </>
  )
}

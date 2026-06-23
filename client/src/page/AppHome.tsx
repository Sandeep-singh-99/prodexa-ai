import FeatureSection from '@/components/Feature-Section'
import GridBackground from '@/components/GridBackground'
import HeroSection from '@/components/HeroSection'
import NavBar from '@/components/NavBar'
import Testimonial from '@/components/Testimonial'

export default function AppHome() {
  return (
    <div className="">
      <GridBackground />
      <NavBar />
      <HeroSection />
      <FeatureSection />
      <Testimonial />
    </div>
  )
}

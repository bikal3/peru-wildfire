// app/page.tsx
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import FireMap from '@/components/FireMap'
import ChartGrid from '@/components/ChartGrid'
import Methodology from '@/components/Methodology'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <StatsBar />
      <FireMap />
      <ChartGrid />
      <Methodology />
      <Footer />
    </main>
  )
}

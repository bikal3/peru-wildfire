'use client'
import { useState } from 'react'
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import FireMap from '@/components/FireMap'
import LandGovernanceChart from '@/components/LandGovernanceChart'
import ChartGrid from '@/components/ChartGrid'
import BurnedAreaChart from '@/components/BurnedAreaChart'
import RegionalTable from '@/components/RegionalTable'
import Methodology from '@/components/Methodology'
import Footer from '@/components/Footer'

export default function Home() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  return (
    <main className="min-h-screen">
      <Hero />
      <StatsBar />
      <FireMap onYearChange={setSelectedYear} />
      <LandGovernanceChart />
      <ChartGrid />
      <BurnedAreaChart />
      <RegionalTable year={selectedYear} />
      <Methodology />
      <Footer />
    </main>
  )
}

import Hero from "@/components/Hero";
import HomeContainer  from "@/components/HomeContainer";
import AthleteGrid from "@/components/AthleteGrid";
import EventsList from "@/components/EventsList";

export default function Home() {
  return (
  <main>
    <Hero />
    <HomeContainer />
    <AthleteGrid />
    <EventsList />
  </main>
  )
}

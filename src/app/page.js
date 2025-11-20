import Hero from "@/components/Hero";
import ResumeContainer  from "@/components/ResumeContainer";
import AthleteGrid from "@/components/AthleteGrid";
import EventsList from "@/components/EventsList";

export default function Home() {
  return (
  <main>
    <Hero />
    <EventsList />
    <ResumeContainer />
    <AthleteGrid />
  </main>
  )
}

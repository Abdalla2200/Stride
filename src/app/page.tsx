import Hero from "@/components/home/Hero";
import JoinTheList from "@/components/home/JoinTheList";
import LandingCategories from "@/components/home/LandingCategories";
import TopRated from "@/components/home/TopRated";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <LandingCategories />
      <TopRated />
      <JoinTheList />
    </div>
  );
}

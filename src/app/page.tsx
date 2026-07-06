import Hero from "@/components/home/Hero";
import JoinTheList from "@/components/home/JoinTheList";
import LandingCategories from "@/components/home/LandingCategories";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <LandingCategories />
      {/* Top Rated */}
      <JoinTheList />
    </div>
  );
}

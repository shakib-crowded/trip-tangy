import { Hero } from "./components/Hero"
import PopularDestinations from "./components/Home/PopularDestinations";
import WhyChooseTT from "./components/Home/WhyChooseTT";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero/>
      <PopularDestinations/>
      <WhyChooseTT/>
    </div>
  );
}
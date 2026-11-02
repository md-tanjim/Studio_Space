import BrowseCategories from "@/components/home/BrowseCategories";
import FeaturedSection from "@/components/home/FeaturedSection";
import Footer from "@/components/home/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import HowItWorks from "@/components/home/HowItWorks";
import Image from "next/image";

export default function Home() {
;



  return (
    <div>

      <HeroBanner></HeroBanner>
      <FeaturedSection></FeaturedSection>
      <BrowseCategories></BrowseCategories>
      <HowItWorks></HowItWorks>
      <Footer></Footer>
    </div>
  );
}

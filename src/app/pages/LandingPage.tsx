import AstroAndFont from "../components/Astro";
import HomePageCard from "../components/HomepageCard";
import { contentContainerClass } from "../components/layoutTokens";

const backgroundStyle: React.CSSProperties = {
  backgroundImage: 'url("/bg.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  minHeight: "100vh",
  opacity: 0.8,
};

export default function LandingPage() {
  return (
    <div style={backgroundStyle} className="flex min-h-screen w-full flex-col">
      <div className={`${contentContainerClass} flex flex-col gap-16 py-16`}>
        <AstroAndFont />
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <HomePageCard />
          <HomePageCard />
        </div>
      </div>
    </div>
  );
}

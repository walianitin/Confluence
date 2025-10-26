import AstroAndFont from "../components/Astro";

import HomePageCard from "../components/HomepageCard";
const backgroundStyle: React.CSSProperties = {
  backgroundImage: 'url("/bg.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100vw",
  minHeight: "100vh",
  scale: "1",
  margin: 0,
  opacity: 0.8,
  padding: 0,
};

export default function LandingPage() {
  return (
    <div style={backgroundStyle} className="min-h-screen min-w-screen ">
      <div className=" flex flex-col">
        <div>
          <AstroAndFont />
        </div>
        <div className=" flex flex-row justify-between  mt-40 p-10 gap-20 ">
          <HomePageCard />
          <HomePageCard />
        </div>
      </div>
    </div>
  );
}

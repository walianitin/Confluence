
import AstroAndFont from "../components/Astro";
import Navbar from "../components/navbar";

const backgroundStyle: React.CSSProperties = {
  backgroundImage: 'url("/bg.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100vw",
  minHeight: "100vh",
  margin: 0,
  opacity:10,
  padding: 0,
};

export default function LandingPage() {
  return (
    <div style={backgroundStyle} className="min-h-screen w-screen flex justify-center items-start">
      <div className="flex justify-center items-center flex-col p-3 gap-30 w-full">
        <Navbar />
        <AstroAndFont />
      </div>
    </div>
  );
}

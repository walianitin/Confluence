import Image from "next/image";
export default function Card() {
  // Outer Radius = Inner Radius + Padding rule
  const outerRadius = 24; // 1.5rem = 24px
  const cardPadding = 8; // 0.5rem = 8px
  const innerRadius = outerRadius - cardPadding; // 16px = 1rem

  return (
    <div
      className="w-fit h-fit"
      style={{ padding: `${cardPadding}px`, borderRadius: `${outerRadius}px` }}
    >
      <div
        className="bg-neutral-900"
        style={{ borderRadius: `${innerRadius}px` }}
      >
        <Image src={"moon.svg"} height={300} width={300} alt="image" />
      </div>
      <div
        className="relative bg-white text-left h-fit text-black text-2xl"
        style={{
          borderRadius: `${innerRadius}px`,
          padding: `${cardPadding}px`,
        }}
      >
        {" "}
        Name
      </div>
      <div
        className="absolute text-purple-300 bg-[radial-gradient(circle,_theme(colors.violet.900)_3%,_theme(colors.white)_100%)]"
        style={{ borderRadius: `${innerRadius}px` }}
      >
        secratary-FineArts
      </div>
    </div>
  );
}

import Image from "next/image";
import {
  CARD_INNER_RADIUS_PX,
  CARD_OUTER_RADIUS_PX,
  CARD_PADDING_PX,
  cardInnerRadiusClass,
  cardSurfaceClasses,
  cardGlassBackground,
} from "./cardTokens";

export default function Card() {
  const cardShellStyle = {
    padding: `${CARD_PADDING_PX}px`,
    borderRadius: `${CARD_OUTER_RADIUS_PX}px`,
  } as const;

  const innerRadiusStyle = {
    borderRadius: `${CARD_INNER_RADIUS_PX}px`,
  } as const;

  return (
    <div
      className={`w-fit h-fit ${cardSurfaceClasses} ${cardGlassBackground}`}
      style={cardShellStyle}
    >
      <div
        className={`bg-neutral-900 ${cardInnerRadiusClass}`}
        style={innerRadiusStyle}
      >
        <Image src={"moon.svg"} height={300} width={300} alt="image" />
      </div>
      <div
        className="relative bg-white text-left h-fit text-black text-2xl"
        style={{
          ...innerRadiusStyle,
          padding: `${CARD_PADDING_PX}px`,
        }}
      >
        {" "}
        Name
      </div>
      <div
        className="absolute text-purple-300 bg-[radial-gradient(circle,_theme(colors.violet.900)_3%,_theme(colors.white)_100%)]"
        style={innerRadiusStyle}
      >
        secratary-FineArts
      </div>
    </div>
  );
}

import Image from "next/image";
import { getCldImageUrl } from 'next-cloudinary';
import {
  CARD_INNER_RADIUS_PX,
  CARD_OUTER_RADIUS_PX,
  CARD_PADDING_PX,
  cardGlassBackground,
  cardInnerRadiusClass,
  cardSurfaceClasses,
} from "./cardTokens";

interface inputProps {
  title: string;
  content: string;
  image: string;
  vector: string;
  day: string;
}

export default function Card(props: inputProps) {
  const outerRadiusPx = CARD_OUTER_RADIUS_PX;
  const innerRadiusPx = CARD_INNER_RADIUS_PX;
  const tileOuterStyle = {
    borderRadius: `${outerRadiusPx}px`,
    padding: `${CARD_PADDING_PX}px`,
  } as const;
  const tileInnerStyle = {
    borderRadius: `${innerRadiusPx}px`,
  } as const;
  // Use NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME when available. If it's not set
  // fall back to the provided image URL (if it's already a full URL) or a
  // local placeholder so `next/image` does not throw the unconfigured-host
  // error. next-cloudinary's getCldImageUrl expects a configured cloud name.
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const url = cloudName
    ? getCldImageUrl({ width: 960, height: 600, src: props.image })
    : props.image && /^https?:\/\//i.test(props.image)
    ? props.image
    : "/sadf.jpg";
  return (
    <div className="flex w-full max-w-6xl flex-col gap-8">
      <div className="grid gap-6 md:grid-cols-[minmax(220px,1fr)_minmax(360px,1.6fr)_minmax(220px,1fr)]">
        <div className="flex flex-col gap-6">
          <article
            className={`${cardSurfaceClasses} ${cardGlassBackground} p-2`}
            style={tileOuterStyle}
          >
            <div
              className={`relative flex h-32 items-center justify-center overflow-hidden bg-black/40 ${cardInnerRadiusClass}`}
              style={tileInnerStyle}
            >
              <Image
                src={url}
                alt={props.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />
              <span className="relative z-10 px-6 text-lg font-semibold uppercase tracking-wide text-white drop-shadow-lg">
                {props.title}
              </span>
            </div>
          </article>

          <article
            className={`${cardSurfaceClasses} ${cardGlassBackground} flex-1 p-2`}
            style={tileOuterStyle}
          >
            <div
              className={`flex h-full w-full items-center tracking-wider justify-center bg-black/30 px-4  text-base text-white/90 ${cardInnerRadiusClass}`}
              style={tileInnerStyle}
            >
              {props.content}
            </div>
          </article>
        </div>

        <article
          className={`${cardSurfaceClasses} ${cardGlassBackground} p-2`}
          style={tileOuterStyle}
        >
          <div
            className={`relative h-[360px] w-full overflow-hidden ${cardInnerRadiusClass}`}
            style={tileInnerStyle}
          >
            <Image
              src={url}
              alt={props.image || props.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </article>

        <div className="flex flex-col gap-6">
          <article
            className={`${cardSurfaceClasses} ${cardGlassBackground} p-2`}
            style={tileOuterStyle}
          >
            <div
              className={`relative flex h-32 items-center justify-center overflow-hidden bg-black/40 ${cardInnerRadiusClass}`}
              style={tileInnerStyle}
            >
              <Image
                src="/bg-wallpaper-old.jpg"
                alt={`${props.day} background`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />
              <span className="relative z-10 px-4 text-lg font-semibold uppercase tracking-wide text-white drop-shadow">
                {props.day}
              </span>
            </div>
          </article>

          {/* <article
            className={`${cardSurfaceClasses} ${cardGlassBackground} flex-1 p-2`}
            style={tileOuterStyle}
          >
            <div
              className={`relative flex h-full w-full flex-col overflow-hidden ${cardInnerRadiusClass}`}
              style={tileInnerStyle}
            >
              <div className="relative h-32 w-full overflow-hidden">
                <Image
                  src="/sadf.jpg"
                  alt={`${props.vector} artwork`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </article> */}
        </div>
      </div>
    </div>
  );
}

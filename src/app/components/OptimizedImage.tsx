import type { ImageProps } from "next/image";
import NextImage from "next/image";

const DEFAULT_QUALITY = 90;
const DEFAULT_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

type OptimizedImageProps = ImageProps & {
  sizes?: string;
};

export default function OptimizedImage({
  quality = DEFAULT_QUALITY,
  sizes = DEFAULT_SIZES,
  ...rest
}: OptimizedImageProps) {
  return <NextImage quality={quality} sizes={sizes} {...rest} />;
}

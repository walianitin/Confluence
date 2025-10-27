import type { NextConfig } from "next";

// Read Cloudinary cloud name from environment. Make sure to set
// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your .env.local or environment.
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
if (!cloudName) {
  // Don't throw here to avoid crashing tools that read the config, but log a
  // clear message so developers know to set the env var.
  // You can change this to `throw new Error(...)` to fail-fast in CI.
  console.warn(
    "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set. Cloudinary-hosted images may not load.\n" +
      "Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your environment (e.g. .env.local) to your Cloudinary cloud name."
  );
}

const nextConfig: NextConfig = {
  images: {
    // Allow images from res.cloudinary.com. If a cloud name is provided we
    // restrict the pathname to that cloud's folder for tighter security.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: cloudName ? `/${cloudName}/**` : "/**",
      },
    ],
  },
};

export default nextConfig;
